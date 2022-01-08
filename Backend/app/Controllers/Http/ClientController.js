'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
    const Client = use("App/Models/Client");
/**
 * Resourceful controller for interacting with clients
 */
class ClientController {
  /**
   * Show a list of all clients.
   * GET clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const client = await Client.all();
    return response.json(client);
  }

  /**
   * Create/save a new person.
   * POST client
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response }) {
    const clientData = request.only([
      "profissao", "tipo_cliente", "people_id", "user_id"]);
    
    try {
      await Client.create(clientData);
      
      return response.json({
        status: "success",
        message: "Cliente cadastrado!",
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "Ocorreu um erro inesperado!",
        
      });
    }
  }

  /**
   * Display a single client.
   * GET clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showClient({ params, response}) {
    try {
      const client = await Client.query()
      .where("id", params.id)
      .with("person")
      .firstOrFail()

    return response.json({
      status: "success",
      data: client,
    })
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Cliente não encontrado!",
      });
    }  
  }

  /**
   * Update client details.
   * PUT or PATCH clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const clientData = request.only(["profissao", "tipo_cliente", "people_id", "user_id"]);

    try {
      const client = await Client.findOrFail(params.id);

      client.profissao = clientData.profissao;
      client.tipo_cliente = clientData.tipo_cliente;
      client.people_id = clientData.people_id;
      client.user_id = clientData.user_id;

      await client.save();

      return response.json({
        status: "success",
        message: "Cliente atualizado!",
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar o seu perfil!",
      });
    }
  }

  /**
   * Delete a client with id.
   * DELETE clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const client = await Client.findOrFail(params.id);

      await client.delete();

      return response.json({
        status: "success",
        message: "Cliente removido com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Cliente não encontrado!",
      });
    }
  }
}

module.exports = ClientController
