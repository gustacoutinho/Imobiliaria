'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeEmployeeSchema extends Schema {
  up () {
    this.alter('employees', (table) => {
      table.integer('user_id').notNullable().unsigned().alter()   
    })
  }

  down () {
    this.table('employees', (table) => {
      table.integer('user_id').nullable().unsigned().alter()
    })
  }
}

module.exports = ChangeEmployeeSchema
