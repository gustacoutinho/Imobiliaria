'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IndicationSchema extends Schema {
  up () {
    this.create('indications', (table) => {
      table.increments()
      table.string('nome', [100]).notNullable()
      table.string('telefone', [100]).notNullable()
      table.string('email', [100]).notNullable()
    })
  }

  down () {
    this.drop('indications')
  }
}

module.exports = IndicationSchema
