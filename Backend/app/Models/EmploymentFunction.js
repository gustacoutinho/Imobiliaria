'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EmploymentFunction extends Model {
    static get createdAtColumn () {
        return null;
    }
    
    static get updatedAtColumn () {
        return null;
    }
    employee () {
        return this.hasMany('App/Models/Employee');  
      }
}

module.exports = EmploymentFunction
