use crate::codegen::input_schema::{FiniteElement, mesh::HyperCubeMesh};

use super::{
    BuildingBlock, BuildingBlockError, BuildingBlockFactory, DofHandlerConfig, MatrixConfig,
    ShapeMatrixConfig, SparsityPatternConfig, VectorConfig,
};

pub fn deal_ii_factory<'a>() -> BuildingBlockFactory<'a> {
    let mut factory = BuildingBlockFactory::new("deal.II");

    factory.add_mesh("hyper_cube", &|name, mesh| {
        let HyperCubeMesh {
            range,
            subdivisions,
            show_info,
        }: &HyperCubeMesh = mesh
            .as_any()
            .downcast_ref()
            .ok_or(BuildingBlockError::WrongInput("hyper_cube".to_string()))?;

        let start = range.start.value;
        let end = range.end.value;
        let mut hyper_cube = BuildingBlock::new();

        hyper_cube.add_includes(&["deal.II/grid/grid_generator.h", "deal.II/grid/tria.h"]);
        hyper_cube.data.push(format!("Triangulation<dim> {name}"));
        hyper_cube
            .setup
            .push(format!("GridGenerator::hyper_cube({name}, {start}, {end})"));
        hyper_cube
            .setup
            .push(format!("{name}.refine_global({subdivisions})"));

        if *show_info {
            hyper_cube.setup.push(format!(
                r#"std::cout << "Number of active cells: " << {name}.n_active_cells() << "\n""#
            ));
        }

        Ok(hyper_cube)
    });

    factory.set_vector(&|name, config| {
        let VectorConfig { dof_handler } = config;
        let mut vector = BuildingBlock::new();
        vector.add_includes(&["deal.II/lac/vector.h"]);
        vector.add_data(&format!("Vector<data_type> {name}"));

        vector
            .setup
            .push(format!("{name}.reinit({dof_handler}.n_dofs())"));

        Ok(vector)
    });

    factory.set_dof_handler(&|name, DofHandlerConfig { mesh, element }| {
        let mut dof_handler = BuildingBlock::new();
        dof_handler.add_includes(&["deal.II/dofs/dof_handler.h"]);
        dof_handler.constructor.push(format!("{name}({mesh})"));
        dof_handler.push_data(format!("DoFHandler<dim> {name}"));

        dof_handler
            .setup
            .push(format!("{name}.distribute_dofs({element})"));
        dof_handler.setup.push(format!(
            r#"std::cout << "Number of degrees of freedom: " << {name}.n_dofs() << "\n\n""#
        ));

        Ok(dof_handler)
    });

    factory.set_finite_element(&|name, element| {
        let mut block = BuildingBlock::new();
        block.add_includes(&["deal.II/fe/fe_q.h"]);
        block.constructor.push(format!(
            "{name}({})",
            match element {
                FiniteElement::Q1 => 1,
                FiniteElement::Q2 => 2,
                FiniteElement::Q3 => 3,
            }
        ));
        block.data.push(format!("const FE_Q<dim> {name}"));
        Ok(block)
    });

    factory.set_sparsity_pattern(&|name, SparsityPatternConfig { dof_handler }| {
        let mut block = BuildingBlock::new();
        let dsp = format!("{dof_handler}_dsp");

        block.add_includes(&[
            "deal.II/lac/dynamic_sparsity_pattern.h",
            "deal.II/lac/sparsity_pattern.h",
            "deal.II/dofs/dof_tools.h",
        ]);

        block.push_data(format!("SparsityPattern {name}"));
        block.push_setup([
            format!("DynamicSparsityPattern {dsp}({dof_handler}.n_dofs(), {dof_handler}.n_dofs())"),
            format!("DoFTools::make_sparsity_pattern({dof_handler}, {dsp})"),
            format!("{name}.copy_from({dsp})"),
        ]);
        block.additional_names.insert(dsp);

        Ok(block)
    });

    factory.set_matrix(&|name, MatrixConfig { sparsity_pattern }| {
        let mut block = BuildingBlock::new();
        block.add_includes(&["deal.II/lac/sparse_matrix.h"]);

        block.push_data(format!("SparseMatrix<data_type> {name}"));
        block.push_setup([format!("{name}.reinit({sparsity_pattern})")]);

        Ok(block)
    });

    factory.set_shape_matrix(&|name, mut matrix, ShapeMatrixConfig { dof_handler, element, matrix_config:_, kind }| {

        matrix.add_includes(&[
            "deal.II/numerics/matrix_creator.h",
            "deal.II/base/quadrature_lib.h",

        ]);
        matrix.push_setup([
                    format!("MatrixCreator::create_{kind}_matrix({dof_handler}, QGauss<2>({element}.degree + 1), {name})")
        ]);
        Ok(matrix)
    });

    factory
}
