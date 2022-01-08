'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const House = use("App/Models/Propertyhouse");

/**
 * Resourceful controller for interacting with propertyhouses
 */
class PropertyHouseController {
  /**
   * Show a list of all propertyhouses.
   * GET propertyhouses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({response}) {
    try {
      const house = await House.all()
    return response.json({
      status: "success",
      data: house,
    })
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Casa não encontrada!",
        technical: error,
      });
    }
  }

  /**
   * Render a form to be used for creating a new propertyhouse.
   * GET propertyhouses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response }) {
    try {
      const houseData = request.only(["qtd_quartos", "qtd_suites", "qtd_sala_estar","qtd_sala_jantar",
      "num_vagas","area","armario_embutido","descricao", "property_id"]);
        await House.create(houseData);
        return response.json({
          status: "success",  
          message: "Casa cadastrado com sucesso!",
          data: houseData,
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
   * Display a single propertyhouse.
   * GET propertyhouses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async showHouse({ params, response }) {
    try {
      const house = await House.query()
      .where("id", params.id)
      .with("property")
      .firstOrFail()

    return response.json({
      status: "success",
      data: house,
    })
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Casa não encontrado!",
      });
    }
  }

  /**
   * Render a form to update an existing propertyhouse.
   * GET propertyhouses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async update ({ params, request, response}) {
    const houseData = request.only(["qtd_quartos", "qtd_suites", "qtd_sala_estar","qtd_sala_jantar",
    "num_vagas","area","armario_embutido","descricao"]);
    
    try {
      console.log('aqui')
      const house = await House.findOrFail(params.id);
      
      house.qtd_quartos = houseData.qtd_quartos;
      house.qtd_suites = houseData.qtd_suites;
      house.qtd_sala_estar = houseData.qtd_sala_estar;
      house.qtd_sala_jantar = houseData.qtd_sala_jantar;
      house.num_vagas = houseData.num_vagas;
      house.area = houseData.area;
      house.armario_embutido = houseData.armario_embutido;
      house.descricao = houseData.descricao;
      await house.save();

      return response.json({
        status: "success",
        message: "Casa atualizada com sucesso!",
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar!",
        technical: error,
      });
    }
  }

  /**
   * Delete a propertyhouse with id.
   * DELETE propertyhouses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async destroy ({ params, response }) {
    try {
      const house = await House.findOrFail(params.id);

      await house.delete();

      return response.json({
        status: "success",
        message: "Casa removida com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Casa não encontrada!",
      });
    }

  }
}

module.exports = PropertyHouseController
