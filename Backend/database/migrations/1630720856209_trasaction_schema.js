'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TrasactionSchema extends Schema {
  up () {
    this.create('trasactions', (table) => {
      table.increments()
      table.integer('num_contrato').notNullable()
      table.decimal('valor_acordado', [15], [2]).notNullable()
      table.decimal('comissao_imobiliaria', [15], [2]).notNullable()
      table.decimal('comissao_funcionario', [15], [2]).notNullable()
      table.timestamps()
      table.integer('employee_id')      
      .unsigned()
      .references('id')
      .inTable('employees')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable()
      table.integer('client_id')      
      .unsigned()
      .references('id')
      .inTable('clients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable()
      table.integer('payment_id')      
      .unsigned()
      .references('id')
      .inTable('payment_methods')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable()
      table.integer('property_id')      
      .unsigned()
      .references('id')
      .inTable('properties')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable()
    })
  }

  down () {
    this.drop('trasactions')
  }
}

module.exports = TrasactionSchema
