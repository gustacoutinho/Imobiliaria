'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {

      user () {
        return this.belongsTo('App/Models/User');
      }
      person () {
        return this.belongsTo('App/Models/Person', 'people_id');
      }
      property () {
        return this.belongsToMany('App/Models/Property', 'client_id').pivotTable('property_owners')
      }
      transaction () {
        return this.hasMany('App/Models/Trasaction');  
      }
      
      static get createdAtColumn () {
        return null;
      }
    
      static get updatedAtColumn () {
        return null;
      }
}

module.exports = Client
