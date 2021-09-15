'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PropertyComercialRoomSchema extends Schema {
  up () {
    this.create('property_comercial_rooms', (table) => {
      table.increments()
      table.decimal('area', [15], [3]).notNullable()
      table.integer('qtd_banheiro').notNullable()
      table.integer('qtd_comodo').notNullable()
      table.integer('property_id')
      .unsigned()
      .references('id')
      .inTable('properties')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable().unique()
    })
  }

  down () {
    this.drop('property_comercial_rooms')
  }
}

module.exports = PropertyComercialRoomSchema
