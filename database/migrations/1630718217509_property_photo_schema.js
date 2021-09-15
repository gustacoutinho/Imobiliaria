'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PropertyPhotoSchema extends Schema {
  up () {
    this.create('property_photos', (table) => {
      table.increments()
      table.string('foto', [255]).notNullable()
      table.integer('property_id')
      .unsigned()
      .references('id')
      .inTable('properties')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable()
    })
  }

  down () {
    this.drop('property_photos')
  }
}

module.exports = PropertyPhotoSchema
