'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const EmployeeFunction = use("App/Models/EmploymentFunction");
/**
 * Resourceful controller for interacting with employmentfunctions
 */
class EmploymentFunctionController {
  /**
   * Show a list of all employmentfunctions.
   * GET employmentfunctions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const employeeF = await EmployeeFunction.all();
    return response.json(employeeF);
  }

  /**
   * Render a form to be used for creating a new employmentfunction.
   * GET employmentfunctions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response}) {
    const EmployeeF = request.only([
      "descricao", "salario_base"]);

    try {
      await EmployeeFunction.create(EmployeeF);
      
      return response.json({
        status: "success",
        message: "Cargo cadastrado!",
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "Ocorreu um erro inesperado!",
        technical: error,
      });
    }
  }

  /**
   * Display a single employmentfunction.
   * GET employmentfunctions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async showEmploymentfunctions({params, response}) {
    try {
      const employmentfunction = await EmployeeFunction.query()
        .where("id", params.id)
        .with("employee", (builder) => {
          builder.with("person");
          builder.with("user");
        })
        .firstOrFail()

      return response.json({
        status: "success",
        data: employmentfunction,
      })
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Cargo não encontrado!",
        technical: error,
      });
    }
  }


  /**
   * Update employmentfunction details.
   * PUT or PATCH employmentfunctions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async update({ params, request, response }) {
    const employeeData = request.only(["descricao", "salario_base"]);

    try {
      const employee = await EmployeeFunction.findOrFail(params.id);

      employee.descricao = employeeData.descricao;
      employee.salario_base = employeeData.salario_base;

      await employee.save();

      return response.json({
        status: "success",
        message: "Cargo do funcionário atualizado!",
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar o Cargo!",
      });
    }
  }

  /**
   * Delete a employmentfunction with id.
   * DELETE employmentfunctions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const employee = await EmployeeFunction.findOrFail(params.id);

      await employee.delete();

      return response.json({
        status: "success",
        message: "Cargo do Funcionário removido com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Cargo não encontrado!",
      });
    }
  }
}

module.exports = EmploymentFunctionController
