'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PropertyHouseApartmentSchema extends Schema {
  up () {
    this.create('property_house_apartments', (table) => {
      table.increments()
      table.integer('andar').notNullable()
      table.decimal('taxa_condominio', [15],[2]).notNullable()
      table.tinyint('portaria24h').notNullable()
      table.integer('property_id')      
      .unsigned()
      .references('id')
      .inTable('properties')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable().unique()
      table.integer('property_house_id')
      .unsigned()
      .references('id')
      .inTable('property_houses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable().unique()
    })
  }

  down () {
    this.drop('property_house_apartments')
  }
}

module.exports = PropertyHouseApartmentSchema
