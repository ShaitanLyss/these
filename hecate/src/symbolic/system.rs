use itertools::Itertools;

use super::*;
use crate::symbol;

#[derive(Debug, Clone)]
pub struct System {
    pub unknowns: Vec<Func>,
    pub known_unknowns: Vec<Func>,
    pub knowns: Vec<Func>,
    pub equations: Vec<Eq>,
}

impl std::fmt::Display for System {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "System ({}), ({}), ({})\n{}",
            self.unknowns
                .iter()
                .map(|f| f.str())
                .collect::<Vec<_>>()
                .join(", "),
            self.known_unknowns
                .iter()
                .map(|f| f.str())
                .collect::<Vec<_>>()
                .join(", "),
            self.knowns
                .iter()
                .map(|f| f.str())
                .collect::<Vec<_>>()
                .join(", "),
            self.equations
                .iter()
                .map(|e| format!("> {}", e.str()))
                .collect::<Vec<_>>()
                .join("\n")
        )
    }
}

impl System {
    pub fn new<
        'a,
        T: IntoIterator<Item = &'a str>,
        U: IntoIterator<Item = &'a str>,
        V: IntoIterator<Item = &'a Eq>,
    >(
        unknowns: T,
        knowns: U,
        equations: V,
    ) -> Self {
        Self {
            unknowns: unknowns.into_iter().map(|s| Func::new(s, [])).collect(),
            knowns: knowns.into_iter().map(|s| Func::new(s, [])).collect(),
            equations: equations.into_iter().cloned().collect(),
            known_unknowns: vec![],
        }
    }

    pub fn to_first_order_in_time(&self) -> Self {
        let mut unknowns = self.unknowns.clone();
        let u = Func::new("u", []);
        let v = Func::new("v", []);

        let mut equations: Vec<_> = self
            .equations
            .iter()
            .map(|e| {
                e.subs(&vec![[u.diff("t", 2), v.diff("t", 1)]])
                    .as_eq()
                    .unwrap()
            })
            .collect();

        equations.insert(0, Eq::new(&v, &*u.diff("t", 1)));
        unknowns.push(v);

        System {
            unknowns,
            knowns: self.knowns.clone(),
            equations,
            known_unknowns: vec![],
        }
    }

    pub fn time_discretized(&self) -> Self {
        let mut unknowns: Vec<Func> = Vec::with_capacity(self.unknowns.len());
        let mut known_unknowns: Vec<Func> = Vec::with_capacity(self.unknowns.len());
        let mut knowns: Vec<Func> = Vec::with_capacity(self.unknowns.len() + self.knowns.len());

        // let substitutions: Vec<_> = iproduct!(self.unknowns.iter(), unknowns.iter()).chain(iproduct!(self.knowns.iter().zip,knowns.iter()).map(|(replaced, replacement)| [replaced, replacement]).collect();
        let mut substitutions: Vec<[Box<dyn Expr>; 2]> =
            Vec::with_capacity(self.unknowns.len() + self.knowns.len());

        for f in &self.unknowns {
            let [prev, curr] = f.time_discretize();
            known_unknowns.push(prev);
            unknowns.push(curr);
        }

        for f in &self.knowns {
            let [prev, curr] = f.time_discretize();
            knowns.push(prev);
            knowns.push(curr);
        }

        for f in self.unknowns.iter().chain(self.knowns.iter()) {
            let [prev, curr] = f.time_discretize();

            let curr = &curr.clone_box();
            let prev = &prev.clone_box();

            let k = &Symbol::new_box("k").clone_box();
            let theta = &Symbol::new_box("θ").clone_box();

            substitutions.push([f.diff("t", 1).clone_box(), (curr - prev) / k]);
            substitutions.push([
                f.clone_box(),
                theta * curr + (Integer::new_box(1) - theta) * prev,
            ])
        }

        let equations: Vec<_> = self
            .equations
            .iter()
            .map(|e| e.subs(&substitutions).as_eq().unwrap())
            .collect();

        System {
            unknowns,
            knowns,
            equations,
            known_unknowns,
        }
    }

    pub fn simplified(&self) -> Self {
        let mut equations = self.equations.clone();
        // let equations = self.equations.iter().map(|e| e.expand().as_eq().unwrap()).collect();

        let v_curr = &Func::new("v^n", []);

        equations[1] = equations[1]
            .solve([v_curr.get_ref()])
            .expand()
            .as_eq()
            .unwrap();
        equations[0] = equations[0]
            .subs(&vec![[v_curr.clone_box(), equations[1].rhs.clone_box()]])
            .as_eq()
            .expect("should remain an eq");
        equations[0] = equations[0]
            .solve([Func::new("u^n", []).get_ref()])
            .expand()
            .as_eq()
            .unwrap();

        self.with_equations(equations)
    }

    pub fn factor(&self) -> Self {
        let laplacian = symbol!("laplacian");
        let matrixes = [Symbol::new_box("M^n"), Symbol::new_box("A^n")];
        let symbols: Vec<Box<dyn Expr>> = self
            .unknowns
            .iter()
            .map(|f| f.get_ref())
            .chain(self.known_unknowns.iter().map(|f| f.get_ref()))
            .chain(matrixes.iter().map(|m| m.get_ref()))
            .chain(self.knowns.iter().map(|f| f.get_ref()))
            .flat_map(|f| [laplacian * f, f.clone_box()])
            .chain([Symbol::new_box("k"), Symbol::new_box("theta")])
            .collect();
        let symbols: Vec<_> = symbols.iter().map(|e| e.get_ref()).collect();
        let equations: Vec<_> = self
            .equations
            .iter()
            .map(|eq| eq.factor(&symbols).as_eq().unwrap())
            .collect();

        self.with_equations(equations)
    }

    pub fn matrixify(&self) -> Self {
        let mut knowns: Vec<Func> = Vec::with_capacity(self.knowns.len());
        let mut known_unknowns: Vec<Func> = Vec::with_capacity(self.known_unknowns.len());
        let mut unknowns: Vec<Func> = Vec::with_capacity(self.unknowns.len());
        let laplacian = symbol!("laplacian");

        let mass_mat = symbol!("M^n");
        let mass_mat_prev = symbol!("M^n,n-1");
        let laplace_mat = symbol!("A^n");
        let laplace_mat_prev = symbol!("A^n,n-1");

        let mut substitutions =
            Vec::with_capacity(2 * knowns.len() + 2 * known_unknowns.len() + unknowns.len());

        for known in &self.knowns {
            let known_vec = known.to_vector();
            substitutions.push([known.clone_box(), known_vec.clone_box()]);
            knowns.push(known_vec);
        }

        for unknown in &self.unknowns {
            let unknown_vec = unknown.to_vector();
            substitutions.push([
                laplacian * unknown.get_ref(),
                -laplace_mat * unknown_vec.get_ref(),
            ]);
            substitutions.push([unknown.clone_box(), mass_mat * unknown_vec.get_ref()]);
            unknowns.push(unknown_vec);
        }

        for unknown in &self.known_unknowns {
            let unknown_vec = unknown.to_vector();
            substitutions.push([
                laplacian * unknown.get_ref(),
                -laplace_mat_prev * unknown_vec.get_ref(),
            ]);
            substitutions.push([unknown.clone_box(), mass_mat_prev * unknown_vec.get_ref()]);
            known_unknowns.push(unknown_vec);
        }

        let equations = self
            .equations
            .iter()
            .map(|e| {
                e.subs(&substitutions)
                    .factor(&unknowns.iter().map(|e| e.get_ref()).collect::<Vec<_>>())
                    .as_eq()
                    .unwrap()
            })
            .collect();

        System {
            unknowns,
            knowns,
            known_unknowns,
            equations,
        }
    }

    pub fn to_constant_mesh(&self) -> Self {
        let mass_mat = Symbol::new_box("M^n");
        let mass_mat_prev = Symbol::new_box("M^n,n-1");
        let laplace_mat = Symbol::new_box("A^n");
        let laplace_mat_prev = Symbol::new_box("A^n,n-1");

        let subs = [[mass_mat_prev, mass_mat], [laplace_mat_prev, laplace_mat]];

        self.with_equations(
            self.equations
                .iter()
                .map(|eq| eq.subs(&subs).as_eq().unwrap())
                .collect(),
        )
        .factor()
    }

    pub fn to_crank_nikolson(&self) -> Self {
        let theta = Symbol::new_box("θ");
        self.subs(&[[theta, Rational::new_box(1, 2)]]).simplify()
    }

    pub fn to_explicit_euler(&self) -> Self {
        let theta = Symbol::new_box("θ");
        self.subs(&[[theta, Integer::new_box(0)]])
    }

    pub fn to_implicit_euler(&self) -> Self {
        let theta = Symbol::new_box("θ");
        self.subs(&[[theta, Integer::new_box(1)]])
    }

    pub fn subs(&self, substitutions: &[[Box<dyn Expr>; 2]]) -> Self {
        self.with_equations(
            self.equations
                .iter()
                .map(|e| e.subs(substitutions).as_eq().unwrap())
                .collect(),
        )
    }

    pub fn expand(&self) -> Self {
        self.with_equations(
            self.equations
                .iter()
                .map(|e| e.expand().as_eq().unwrap())
                .collect(),
        )
    }

    pub fn simplify(&self) -> Self {
        self.expand().factor().with_equations(
            self.equations
                .iter()
                .map(|expr| expr.simplify().as_eq().unwrap())
                .collect(),
        )
    }

    pub fn with_equations(&self, equations: Vec<Eq>) -> Self {
        System {
            known_unknowns: self.known_unknowns.clone(),
            unknowns: self.unknowns.clone(),
            knowns: self.knowns.clone(),
            equations,
        }
    }

    pub(crate) fn vectors(&self) -> impl Iterator<Item = String> {
        self.unknowns
            .iter()
            .chain(self.known_unknowns.iter())
            .chain(self.knowns.iter())
            .map(|f| f.str())
    }

    pub(crate) fn num_vectors(&self) -> usize {
        [&self.unknowns, &self.known_unknowns, &self.knowns]
            .iter()
            .map(|v| v.len())
            .reduce(|acc, e| acc + e)
            .unwrap()
    }

    pub fn eqs_in_solving_order(&self) -> impl Iterator<Item = &Equation> {
        fn get_rhs_unknowns(system: &System, eq: &Equation) -> impl Iterator<Item = String> {
            system.unknowns.iter().filter_map(|unknown| {
                if eq.has(unknown) {
                    Some(unknown.str())
                } else {
                    None
                }
            })
        }

        self.equations
            .iter()
            .map(|e| (e, get_rhs_unknowns(self, e).count()))
            .sorted_by_key(|e| e.1)
            .map(|(e, _)| e)
    }

    pub fn equation_lhs_unknowns(&self, equation: &Equation) -> impl Iterator<Item = String> {
        self.unknowns.iter().filter_map(|unknown| {
            if equation.has(unknown) {
                Some(unknown.str())
            } else {
                None
            }
        })
    }
}
