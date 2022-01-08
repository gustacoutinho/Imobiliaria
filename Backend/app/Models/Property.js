'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Property extends Model {
    static get createdAtColumn () {
        return null;
    }
    static get updatedAtColumn () {
        return null;
    }
    terrain () {
        return this.hasOne('App/Models/PropertyTerrain')
    }
    house () {
        return this.hasOne('App/Models/PropertyHouse')
    }
    apartment () {
        return this.hasOne('App/Models/PropertyHouseApartment')
    }
    photo (){
        return this.hasMany('App/Models/PropertyPhoto')
    }
    comercialRoom (){
        return this.hasOne('App/Models/PropertyComercialRoom')
    }
    client () {
        return this.belongsToMany('App/Models/Client', 'property_id','client_id').pivotTable('property_owners')
    }
    transaction () {
        return this.hasMany('App/Models/Trasaction');  
      }
    

}

module.exports = Property
