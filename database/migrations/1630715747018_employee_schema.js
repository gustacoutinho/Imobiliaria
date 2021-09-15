'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeSchema extends Schema {
  up () {
    this.create('employees', (table) => {
      table.increments('id')
      table.date('data_ingresso').notNullable()
      table.decimal('salario_real', [15], [2]).notNullable()
      table.integer('people_id')
      .unsigned()
      .references('id')
      .inTable('people')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
      .unique()
      table.integer('employment_function_id')
      .unsigned()
      .references('id')
      .inTable('employment_functions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
      .unique()
      table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').unique()
      // table.unique(['id', 'people_id','user_id']);
    })
  }

  down () {
    this.drop('employees')
  }
}

module.exports = EmployeeSchema
