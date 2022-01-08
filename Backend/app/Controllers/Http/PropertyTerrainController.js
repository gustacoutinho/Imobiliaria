'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
    const Terrain = use("App/Models/PropertyTerrain");

/**
 * Resourceful controller for interacting with propertyterrains
 */
class PropertyTerrainController {
  /**
   * Show a list of all propertyterrains.
   * GET propertyterrains
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view }) {
    const terrain = await Terrain.all();
    return response.json(terrain);
  }

  

  /**
   * Render a form to be used for creating a new propertyterrain.
   * GET propertyterrains/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async create ({ request, response, auth }) {
    try {
    const terrainData = request.only([
      "area", "largura", "comprimento","aclive_declive", "property_id"]);
      await Terrain.create(terrainData);
      return response.json({
        status: "success",  
        message: "Terreno cadastrado com sucesso!",
        data: terrainData,
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
   * Display a single propertyterrain.
   * GET propertyterrains/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async showTerrain({ params, response }) {
    try {
      const terrain = await Terrain.query()
      .where("id", params.id)
      .with("property")
      .firstOrFail()

    return response.json({
      status: "success",
      data: terrain,
    })
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Terreno não encontrado!",
      });
    }
  }

  /**
   * Render a form to update an existing propertyterrain.
   * GET propertyterrains/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async update({params, request, response }) {
    const terrainData = request.only([
      "area", "largura", "comprimento","aclive_declive"]);
    
    try {
      const terrain = await Terrain.findOrFail(params.id);

      terrain.area = terrainData.area;
      terrain.largura = terrainData.largura;
      terrain.comprimento = terrainData.comprimento;
      terrain.aclive_declive = terrainData.aclive_declive;

      await terrain.save();

      return response.json({
        status: "success",
        message: "Terreno atualizada com sucesso!",
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar!",
      });
    }
  }


  /**
   * Delete a propertyterrain with id.
   * DELETE propertyterrains/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      const terrain = await Terrain.findOrFail(params.id);

      await terrain.delete();

      return response.json({
        status: "success",
        message: "Terreno removido com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Terreno não encontrado!",
      });
    }

  }
}

module.exports = PropertyTerrainController
