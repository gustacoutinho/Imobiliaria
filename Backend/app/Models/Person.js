'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Person extends Model {

      employee () {
        return this.hasOne('App/Models/Employee');
      }
      client () {
        return this.hasOne('App/Models/Client');
      }
      transaction () {
        return this.belongsToMany('App/Models/Trasaction', 'person_id').pivotTable('transaction_guarantors')
      }
      transaction1 () {
        return this.belongsToMany('App/Models/Trasaction', 'person_id').pivotTable('transaction_guarantors')
      }
      static get createdAtColumn () {
        return null;
      }
    
      static get updatedAtColumn () {
        return null;
      }
    
    }
 

module.exports = Person
