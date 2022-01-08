'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Indication extends Model {

    static get createdAtColumn () {
        return null;
        }
    
        static get updatedAtColumn () {
        return null;
        }
    transaction () {
        return this.belongsToMany('App/Models/Trasaction', 'indication_id').pivotTable('indication_trasactions')
        }
}

module.exports = Indication
