'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Indication = use("App/Models/Indication");

/**
 * Resourceful controller for interacting with indications
 */
class IndicationController {
  /**
   * Show a list of all indications.
   * GET indications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view }) {
    const indication = await Indication.all();
    return response.json(indication);
  }

  /**
   * Render a form to be used for creating a new paymentmethod.
   * GET paymentmethods/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async create ({ request, response}) {
    const indication = request.only([
      "nome", "telefone", "email"]);

    try {
      await Indication.create(indication);
      
      return response.json({
        status: "success",
        message: "Indicação registrada!",
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
   * Display a single paymentmethod.
   * GET paymentmethods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show({ params, response }) {
    try {  
      return response.json(await Indication.findOrFail(params.id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Indicação não encontrada!",
      });
    }
  }

  /**
   * Update paymentmethod details.
   * PUT or PATCH paymentmethods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async update({ params, request, response }) {
    const indicationData = request.only(["nome", "telefone", "email"]);

    try {
      const indication = await Indication.findOrFail(params.id);

      indication.nome = indicationData.nome;
      indication.telefone = indicationData.telefone;
      indication.email = indicationData.email;

      await indication.save();

      return response.json({
        status: "success",
        message: "Indicação atualizada!",
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar a indicação!",
      });
    }
  }

  /**
   * Delete a paymentmethod with id.
   * DELETE paymentmethods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request 
   * @param {Response} ctx.response
   */
   async destroy ({ params, response }) {
    try {
      const indication = await Indication.findOrFail(params.id);

      await indication.delete();

      return response.json({
        status: "success",
        message: "Indicação removida com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Indicação não encontrada!",
      });
    }
  }
}

module.exports = IndicationController
