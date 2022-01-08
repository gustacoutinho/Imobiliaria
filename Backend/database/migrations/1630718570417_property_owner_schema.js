'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PropertyOwnerSchema extends Schema {
  up () {
    this.create('property_owners', (table) => {
      table.integer('property_id')
      .unsigned()
      .references('id')
      .inTable('properties')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable()
      table.integer('client_id')
      .unsigned()
      .references('id')
      .inTable('clients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable()
      table.primary(['client_id', 'property_id'])
    })
  }

  down () {
    this.drop('property_owners')
  }
}

module.exports = PropertyOwnerSchema
