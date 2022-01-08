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
      .onDelete('CASCADE').unique()
    })
  }

  down () {
    this.table('clients', (table) => {
      table.dropForeign("user_id")
      table.dropColumn("user_id")
    })
  }
}

module.exports = ChangeClientSchema
