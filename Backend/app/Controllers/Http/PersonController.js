'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Person = use("App/Models/Person");

/**
 * Resourceful controller for interacting with people
 */
class PersonController {
  /**
   * Show a list of all people.
   * GET people
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index({ request, response, view }) {
    const users = await Person.all();
    return response.json(users);
  }

  /**
   * Render a form to be used for creating a new person.
   * GET people/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async create({ request, response, auth }) {
    const personData = request.only([
      "nome", "cpf", "endereco", "telefone", "cidade",
      "uf", "bairro", "email", "sexo", "estado_civil"]);

    try {
      await Person.create(personData);
      
      return response.json({
        status: "success",
        message: "Pessoa cadastrada com sucesso!",
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
   * Display a single person.
   * GET people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async showPeople({ params, response }) {
    try {
      return response.json(await Person.findOrFail(params.id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Pessoa não encontrada!",
      });
    }
  }

  /**
   * Render a form to update an existing person.
   * GET people/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async updateProfile({ auth, params, request, response }) {
    
  }

  /**
   * Update person details.
   * PUT or PATCH people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async updateProfile({ auth, params, request, response }) {
    const personData = request.only([
      "nome", "cpf", "endereco", "telefone", "cidade",
      "uf", "bairro", "email", "sexo", "estado_civil"
    ]);

    try {
      const person = await Person.findOrFail(params.id);

      person.nome = personData.nome;
      person.cpf = personData.cpf;
      person.endereco = personData.endereco;
      person.telefone = personData.telefone;
      person.cidade = personData.cidade;
      person.uf = personData.uf;
      person.bairro = personData.bairro;
      person.email = personData.email;
      person.sexo = personData.sexo;
      person.estado_civil = personData.estado_civil;

      await person.save();

      return response.json({
        status: "success",
        message: "Pessoa atualizada com sucesso!",
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar esta pessoa!",
      });
    }
  }

  /**
   * Delete a person with id.
   * DELETE people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const person = await Person.findOrFail(params.id);

      await person.delete();

      return response.json({
        status: "success",
        message: "Pessoa removida com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Pessoa não encontrada!",
      });
    }
  }
}

module.exports = PersonController
