'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
    const Comercial = use("App/Models/PropertyComercialRoom");

/**
 * Resourceful controller for interacting with propertycomercialrooms
 */
class PropertyComercialRoomController {
  /**
   * Show a list of all propertycomercialrooms.
   * GET propertycomercialrooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const comercial = await Comercial.all();
    return response.json(comercial); 
  }

  /**
   * Render a form to be used for creating a new propertycomercialroom.
   * GET propertycomercialrooms/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    try {
      const comercialData = request.only([
        "area", "qtd_banheiro", "qtd_comodo", "property_id"]);
        await Comercial.create(comercialData);
        return response.json({
          status: "success",  
          message: "Sala Comercial cadastrado com sucesso!",
          data: comercialData,
        });
      } catch (error) {
        console.log(error)
        return response.status(500).json({
          status: "error",
          message: "Ocorreu um erro inesperado!",
          technical: error,
        });
      }
  }

  /**
   * Display a single propertycomercialroom.
   * GET propertycomercialrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async showComercialRoom({ params, response }) {
    try {
      const comercial = await Comercial.query()
      .where("id", params.id)
      .with("property")
      .firstOrFail()

    return response.json({
      status: "success",
      data: comercial,
    })
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Sala Comercial não encontrado!",
      });
    }
  }

  /**
   * Update propertycomercialroom details.
   * PUT or PATCH propertycomercialrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const comercialData = request.only([
      "area", "qtd_banheiro", "qtd_comodo"]);
    
    try {
      const comercial = await Comercial.findOrFail(params.id);

      comercial.area = comercialData.area;
      comercial.qtd_banheiro = comercialData.qtd_banheiro;
      comercial.qtd_comodo = comercialData.qtd_comodo;

      await comercial.save();

      return response.json({
        status: "success",
        message: "Sala Comercial atualizada com sucesso!",
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar!",
      });
    }
  }

  /**
   * Delete a propertycomercialroom with id.
   * DELETE propertycomercialrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const comercial = await Comercial.findOrFail(params.id);

      await comercial.delete();

      return response.json({
        status: "success",
        message: "Sala Comercial removido com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Sala Comercial não encontrado!",
      });
    }
  }
}

module.exports = PropertyComercialRoomController
