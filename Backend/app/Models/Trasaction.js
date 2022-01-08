'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Trasaction extends Model {
    employee () {
        return this.belongsTo('App/Models/Employee');
        }
    client () {
        return this.belongsTo('App/Models/Client');
    }
    payment () {
        return this.belongsTo('App/Models/PaymentMethod');
        }
    property () {
        return this.belongsTo('App/Models/Property');
    }
    person () {
        return this.belongsToMany('App/Models/Person', 'trasaction_id').pivotTable('transaction_guarantors')
        }
    person1 () {
        return this.belongsToMany('App/Models/Person', 'trasaction_id').pivotTable('transaction_guarantors')
        }
    indication () {
        return this.belongsToMany('App/Models/Indication', 'trasaction_id').pivotTable('indication_trasactions')
    }
}

module.exports = Trasaction
