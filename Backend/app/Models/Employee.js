'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Employee extends Model {

      user () {
        return this.belongsTo('App/Models/User');
      }
      
      person () {
        return this.belongsTo('App/Models/Person', "people_id");
      }

      employmentFunction () {
        return this.belongsTo('App/Models/EmploymentFunction');  
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

module.exports = Employee
