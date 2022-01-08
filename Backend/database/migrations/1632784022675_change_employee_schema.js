'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeEmployeeSchema extends Schema {
  up () {
    this.alter('employees', (table) => {
      table.dropForeign('employment_function_id')
      table.dropUnique('employment_function_id')

      table.integer('employment_function_id')
      .unsigned()
      .references('id')
      .inTable('employment_functions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable().alter()

    })
  }

  down () {
    this.table('employees', (table) => {
      table.integer('employment_function_id').unsigned().unique().alter()
    })
  }
}

module.exports = ChangeEmployeeSchema
