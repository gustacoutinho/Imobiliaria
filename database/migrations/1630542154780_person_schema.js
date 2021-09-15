'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonSchema extends Schema {
  up () {
    this.create('people', (table) => {
      table.increments()
      table.string('nome', [60]).notNullable()
      table.string('cpf', [11]).notNullable().unique()
      table.string('endereco', [60]).notNullable()
      table.string('telefone', [100]).notNullable()
      table.string('cidade', [100]).notNullable()
      table.string('uf', [2]).notNullable()
      table.string('bairro', [100]).notNullable()
      table.string('email', [100]).notNullable()
      table.string('sexo', [1]).notNullable()
      table.string('estado_civil', [20]).notNullable()
    })
  }

  down () {
    this.drop('people')
  }
}

module.exports = PersonSchema
