'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Property = use("App/Models/Property");
/**
 * Resourceful controller for interacting with properties
 */
class PropertyController {
  
  async index ({ request, response, view }) {
    const property = await Property.query()
    .with("terrain") //buscar algum maneira de não retornar tipos nulos...IF?
    .with("house")
    .with("apartment")
    .with("comercialRoom")
    .with("client")
    .with("client", (builder) => {
      builder.with("person");
    })
    .with("photo")

    .fetch()

    return response.json(property);
  }
  
  async create ({ request, response}) {
    const {client_id, ...propertyData} = request.only([
      "tipo_oferta", "data_construcao", "data_disponivel", "cidade", "uf",
      "endereco", "bairro", "valor_sugerido", "tipo_imovel", "client_id"]);

      try{
      const property = await Property.create(propertyData);
        await property.client().attach(client_id)
        await property.load('client')
      return response.json({property}) 
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "Propriedade ou Cliente não encontrado!",
        technical: error,
      });
    }  
  }

  async update({ auth, params, request, response }) {
    const {client_id, ...propertyData} = request.only([
      "tipo_oferta", "data_construcao", "data_disponivel", "cidade", "uf",
      "endereco", "bairro", "valor_sugerido", "tipo_imovel", "client_id"]);

    try {
      const user = auth.current.user;
      const property = await Property.findOrFail(params.id);

      property.tipo_oferta = propertyData.tipo_oferta;
      property.data_construcao = propertyData.data_construcao;
      property.data_disponivel = propertyData.data_disponivel;
      property.cidade = propertyData.cidade;
      property.uf = propertyData.uf;
      property.endereco = propertyData.endereco;
      property.bairro = propertyData.bairro;
      property.valor_sugerido = propertyData.valor_sugerido;
      property.tipo_imovel = propertyData.tipo_imovel;

      await property.save()
      await property.client().sync(client_id)
      await property.load('client')

      return response.json({
        status: "success",
        message: "Propriedade atualizada com sucesso!",
        property,
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar a Propriedade!",
        technical: error,
      });
    }
  }

   async showProperty({ params, response }) {
    try {
      return response.json(await Property.findOrFail(params.id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Propriedade não encontrada!",
      });
    }
  }

  async show ({params, response}) {
    try {
      const property = await Property.query()
        .where("id", params.id)
        .with("terrain") //buscar algum maneira de não retornar tipos nulos...IF?
        .with("house")
        .with("apartment")
        .with("comercialRoom")
        .with("client", (builder) => {
          builder.with("person");
          builder.with("user"); 
        })
        .with("photo")
        .firstOrFail()

        return response.json(property);
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Propriedade não encontrada!",
        technical: error,
      });
    }
  }

  async destroy ({ params, response }) {
    try {
      const property = await Property.findOrFail(params.id);

      await property.delete();

      return response.json({
        status: "success",
        message: "Propriedade removida com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Propriedade não encontrada!",
      });
    }

  }
}

module.exports = PropertyController
