'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Payment = use("App/Models/PaymentMethod");

/**
 * Resourceful controller for interacting with paymentmethods
 */
class PaymentMethodController {
  /**
   * Show a list of all paymentmethods.
   * GET paymentmethods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view }) {
    const payment = await Payment.all();
    return response.json(payment);
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
    const payment = request.only([
      "descricao"]);

    try {
      await Payment.create(payment);
      
      return response.json({
        status: "success",
        message: "Forma de pagamento registrada!",
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
      return response.json(await Payment.findOrFail(params.id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Forma de pagamento não encontrada!",
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
    const paymentData = request.only(["descricao"]);

    try {
      const payment = await Payment.findOrFail(params.id);

      payment.descricao = paymentData.descricao;

      await payment.save();

      return response.json({
        status: "success",
        message: "Forma de pagamento atualizada!",
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar a forma de pagamento!",
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
      const payment = await Payment.findOrFail(params.id);

      await payment.delete();

      return response.json({
        status: "success",
        message: "Forma de pagamento removida com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Forma de pagamento não encontrada!",
      });
    }
  }
}

module.exports = PaymentMethodController
