'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PropertyTerrainSchema extends Schema {
  up () {
    this.create('property_terrains', (table) => {
      table.increments()
      table.decimal('area', [15], [3]).notNullable()
      table.decimal('largura', [15], [3]).notNullable()
      table.decimal('comprimento', [15], [3]).notNullable()
      table.string('aclive_declive', [1]).notNullable()
      table.integer('property_id')
      .unsigned()
      .references('id')
      .inTable('properties')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable().unique()
    })
  }

  down () {
    this.drop('property_terrains')
  }
}

module.exports = PropertyTerrainSchema
