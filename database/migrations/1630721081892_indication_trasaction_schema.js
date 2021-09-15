'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IndicationTrasactionSchema extends Schema {
  up () {
    this.create('indication_trasactions', (table) => {
      table.integer('indication_id')      
      .unsigned()
      .references('id')
      .inTable('indications')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable()
      table.integer('trasaction_id')      
      .unsigned()
      .references('id')
      .inTable('trasactions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable() 
      table.primary(['indication_id', 'trasaction_id'])
    })
  }

  down () {
    this.drop('indication_trasactions')
  }
}

module.exports = IndicationTrasactionSchema
