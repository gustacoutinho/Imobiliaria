'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeUserSchema extends Schema {
  up () {
    this.table('employees', (table) => {
      table.dropForeign("user_id")
      table.dropColumn("user_id")
    })
  }

  down () {
    this.table('employees', (table) => {
      table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').unique()
    })
  }
}

module.exports = ChangeUserSchema
