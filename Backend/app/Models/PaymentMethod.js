'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PaymentMethod extends Model {
    
static get createdAtColumn () {
    return null;
    }

    static get updatedAtColumn () {
    return null;
    }
transaction () {
    return this.hasMany('App/Models/Trasaction');  
    }
}

module.exports = PaymentMethod
