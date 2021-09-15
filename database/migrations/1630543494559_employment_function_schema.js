'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmploymentFunctionSchema extends Schema {
  up () {
    this.create('employment_functions', (table) => {
      table.increments()
      table.string('descricao', [60]).notNullable()
      table.decimal('salario_base', [15], [2]).notNullable()
    })
  }

  down () {
    this.drop('employment_functions')
  }
}

module.exports = EmploymentFunctionSchema
