'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PropertyHouseApartment extends Model {
    static get createdAtColumn () {
        return null;
    }  
    static get updatedAtColumn () {
        return null;
    }

    house (){
        return this.belongsTo('App/Models/PropertyHouse')
    }

    property (){
        return this.belongsTo('App/Models/Property')
    }
}

module.exports = PropertyHouseApartment
