'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionGuarantorSchema extends Schema {
  up () {
    this.create('transaction_guarantors', (table) => {
      table.integer('person_id')      
      .unsigned()
      .references('id')
      .inTable('people')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable()
      table.integer('trasaction_id')      
      .unsigned()
      .references('id')
      .inTable('trasactions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable() 
      table.primary(['person_id', 'trasaction_id'])
    })
  }

  down () {
    this.drop('transaction_guarantors')
  }
}

module.exports = TransactionGuarantorSchema
