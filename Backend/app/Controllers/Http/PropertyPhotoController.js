'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Property = use("App/Models/Property");
const Photo = use("App/Models/PropertyPhoto");
const Helpers = use('Helpers')

class PropertyPhotoController {

  async index ({response}) {
    const photo = await Photo.all();
    return response.json(photo);
  }

   async create ({ request, response, params}) {
    try {
      const property = await Property.findOrFail(params.id)

      const photo = request.file('file', {
        size: '2mb'

      })
      await photo.moveAll(Helpers.tmpPath('photo'), file =>({
        name: `${Date.now()}-${file.clientName}`
      }))
      
      if(!photo.movedAll()){
        return photo.errors()
      }

      await Promise.all(
        photo
        .movedList()
        .map(item => property.photo().create({foto: item.fileName})))

      return response.status(200).send({
        status: "success",
        message: 'Imagem cadastrada com sucesso!'});
        

      } catch (error) {

        return response.status(500).send({
          erro: 'Não foi possível cadastrar imagem.',
          technical: error});
    } 
  }

  async showPhoto ({ params, response }) {
    try {
      const photo = await Photo.query()
      .where("id", params.id)
      .with("property")
      .firstOrFail()

    return response.json({
      status: "success",
      data: photo,
    })
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Foto não encontrada!",
      });
    }
  }

  async destroy ({ params, response }) {
    try {
      const photo = await Photo.findOrFail(params.id);

      await photo.delete();

      return response.json({
        status: "success",
        message: "Foto removida com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Foto não encontrada!",
      });
    }
  }
}

module.exports = PropertyPhotoController
