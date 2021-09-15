'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PropertySchema extends Schema {
  up () {
    this.create('properties', (table) => {
      table.increments()
      table.string('tipo_oferta', [2]).notNullable()
      table.date('data_construcao').notNullable()
      table.date('data_disponivel').notNullable()
      table.string('cidade', [100]).notNullable()
      table.string('uf', [2]).notNullable()
      table.string('endereco', [100]).notNullable()
      table.string('bairro', [100]).notNullable()
      table.decimal('valor_sugerido', [15],[2]).notNullable()
      table.string('tipo_imovel', [20]).notNullable()
    })
  }

  down () {
    this.drop('properties')
  }
}

module.exports = PropertySchema
