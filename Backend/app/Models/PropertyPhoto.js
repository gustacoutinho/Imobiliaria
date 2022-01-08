'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PropertyPhoto extends Model {
    property (){
        return this.belongsTo('App/Models/Property')
    }
    static get createdAtColumn () {
        return null;
    }
    static get updatedAtColumn () {
        return null;
    }
}

module.exports = PropertyPhoto
