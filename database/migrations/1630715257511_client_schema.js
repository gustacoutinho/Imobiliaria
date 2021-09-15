'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments('id')
      table.string('profissao', [100]).notNullable()
      table.decimal('tipo_cliente', [4]).notNullable() 
      table.integer('people_id').unsigned().references('id').inTable('people').onUpdate('CASCADE').onDelete('CASCADE')
      table.unique(['id', 'people_id']);
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
