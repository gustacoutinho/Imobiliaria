'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
    const Apartment = use("App/Models/PropertyHouseApartment");
/**
 * Resourceful controller for interacting with propertyhouseapartments
 */
class PropertyHouseApartmentController {
  /**
   * Show a list of all propertyhouseapartments.
   * GET propertyhouseapartments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const apartment = await Apartment.all();
    return response.json(apartment); 
  }

  /**
   * Render a form to be used for creating a new propertyhouseapartment.
   * GET propertyhouseapartments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    try {
      const apartmentData = request.only([
        "andar", "taxa_condominio", "portaria24h", "property_id", "property_house_id"]);
        await Apartment.create(apartmentData);
        return response.json({
          status: "success",  
          message: "Apartamento cadastrado com sucesso!",
          data: apartmentData,
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
   * Create/save a new propertyhouseapartment.
   * POST propertyhouseapartments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async showApartment({ params, response }) {
    try {
      const apartment = await Apartment.query()
      .where("id", params.id)
      .with("house")
      .with("property")
      .firstOrFail()

    return response.json({
      status: "success",
      data: apartment,
    })
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Apartamento não encontrado!",
      });
    }
  }
  /**
   * Update propertyhouseapartment details.
   * PUT or PATCH propertyhouseapartments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async update({params, request, response }) {
    const apartmentData = request.only([
      "andar", "taxa_condominio", "portaria24h"]);
    
    try {
      const apartment = await Apartment.findOrFail(params.id);

      apartment.andar = apartmentData.andar;
      apartment.taxa_condominio = apartmentData.taxa_condominio;
      apartment.portaria24h = apartmentData.portaria24h;

      await apartment.save();

      return response.json({
        status: "success",
        message: "Apartamento atualizada com sucesso!",
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar!",
      });
    }
  }

  /**
   * Delete a propertyhouseapartment with id.
   * DELETE propertyhouseapartments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const apartment = await Apartment.findOrFail(params.id);

      await apartment.delete();

      return response.json({
        status: "success",
        message: "Apartamento removido com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Apartamento não encontrado!",
      });
    }
  }
}

module.exports = PropertyHouseApartmentController
