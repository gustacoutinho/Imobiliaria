'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
    const Employee = use("App/Models/Employee");
/**
 * Resourceful controller for interacting with employees
 */
class EmployeeController {
  /**
   * Show a list of all employees.
   * GET employees
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const employee = await Employee.all();
    return response.json(employee);
  }

  /**
   * Render a form to be used for creating a new employee.
   * GET employees/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response}) {
    const EmployeeData = request.only([
      "data_ingresso", "salario_real", "people_id", "employment_function_id", "user_id"]);
    
    try {
      await Employee.create(EmployeeData);
      
      return response.json({
        status: "success",
        message: "Funcionário cadastrado!",
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
   * Display a single employee.
   * GET employees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async showEmployee({ params, response }) {
    try {
      const employee = await Employee.query()
        .where("id", params.id)
        .with("person")
        .firstOrFail()

      return response.json({
        status: "success",
        data: employee,
      })
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Funcionário não encontrado!",
      });
    }
  }

  /**
   * Update employee details.
   * PUT or PATCH employees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async updateProfile({ params, request, response }) {
    const employeeData = request.only(["salario_real"]);

    try {
      const employee = await Employee.findOrFail(params.id);

      employee.salario_real = employeeData.salario_real;

      await employee.save();

      return response.json({
        status: "success",
        message: "Funcionário atualizado!",
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar o seu perfil!",
      });
    }
  }

  /**
   * Delete a employee with id.
   * DELETE employees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async destroy ({ params, request, response }) {
    try {
      const employee = await Employee.findOrFail(params.id);

      await employee.delete();

      return response.json({
        status: "success",
        message: "Funcionário removido com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Funcionário não encontrado!",
      });
    }
  }
}

module.exports = EmployeeController
