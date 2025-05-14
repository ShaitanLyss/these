use super::*;

#[derive(Debug, Clone)]
pub struct System {
    pub unknowns: Vec<Func>,
    pub knowns: Vec<Func>,
    pub equations: Vec<Eq>,
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

        equations.push(Eq::new(&v, &*u.diff("t", 1)));
        unknowns.push(v);

        System {
            unknowns,
            knowns: self.knowns.clone(),
            equations,
        }
    }

    pub fn time_discretized(&self) -> Self {
        let mut unknowns: Vec<Func> = Vec::with_capacity(self.unknowns.len());
        let mut knowns: Vec<Func> = Vec::with_capacity(self.unknowns.len() + self.knowns.len());

        // let substitutions: Vec<_> = iproduct!(self.unknowns.iter(), unknowns.iter()).chain(iproduct!(self.knowns.iter().zip,knowns.iter()).map(|(replaced, replacement)| [replaced, replacement]).collect();
        let mut substitutions: Vec<[Box<dyn Expr>; 2]> =
            Vec::with_capacity(self.unknowns.len() + self.knowns.len());

        for f in &self.unknowns {
            let [prev, curr] = f.time_discretize();
            knowns.push(prev);
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

            let k = &Symbol::new("k").clone_box();
            let theta = &Symbol::new("θ").clone_box();

            substitutions.push([f.diff("t", 1).clone_box(), (curr - prev) / k]);
            substitutions.push([f.clone_box(), theta * curr + (Integer::new(1) - theta) * prev ])
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
        }
    }
}
