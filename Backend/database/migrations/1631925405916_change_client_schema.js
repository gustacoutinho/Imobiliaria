'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeClientSchema extends Schema {
  up () {
    this.table('clients', (table) => {
      table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable().unique()
    })
    
    this.alter('clients', (table) => {
      table.integer('people_id').notNullable().unsigned().alter()
    })

    this.alter('clients', (table) => {
      table.string('tipo_cliente', [4]).alter().notNullable()
    })
  }

  down () {
    this.table('clients', (table) => {
      table.dropForeign("user_id")
      table.dropColumn("user_id")
      table.integer('people_id').nullable().unsigned().alter()
      table.integer('tipo_cliente').alter().notNullable()
    })
  }
}

module.exports = ChangeClientSchema
