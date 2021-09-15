'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('login', [15]).notNullable().unique()
      table.string('senha', [255]).notNullable()
      
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
