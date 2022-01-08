'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeHistorySchema extends Schema {
  up () {
    this.alter('histories', (table) => {
      table.string('codigo_proprietario', [25]).alter().notNullable()
    })
  }

  down () {
    this.table('histories', (table) => {
      table.integer('codigo_proprietario').alter().notNullable()
    })
  }
}

module.exports = ChangeHistorySchema
