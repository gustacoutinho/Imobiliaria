'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PropertyHouseSchema extends Schema {
  up () {
    this.create('property_houses', (table) => {
      table.increments()
      table.integer('qtd_quartos').notNullable()
      table.integer('qtd_suites').notNullable()
      table.integer('qtd_sala_estar').notNullable()
      table.integer('qtd_sala_jantar').notNullable()
      table.integer('num_vagas').notNullable()
      table.decimal('area', [15], [3]).notNullable()
      table.tinyint('armario_embutido').notNullable()
      table.string('descricao', [100]).notNullable()
      table.integer('property_id')
      .unsigned()
      .references('id')
      .inTable('properties')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable().unique()
    })
  }

  down () {
    this.drop('property_houses')
  }
}

module.exports = PropertyHouseSchema
