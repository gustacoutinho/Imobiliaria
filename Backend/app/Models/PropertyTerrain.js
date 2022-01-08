'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PropertyTerrain extends Model {
  static get createdAtColumn () {
    return null;
  }  
  static get updatedAtColumn () {
    return null;
  }
  property (){
    return this.belongsTo('App/Models/Property')
  }

}

module.exports = PropertyTerrain
