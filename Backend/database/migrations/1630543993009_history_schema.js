'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistorySchema extends Schema {
  up () {
    this.create('histories', (table) => {
      table.increments()
      table.integer('num_contrato').notNullable()
      table.decimal('valor_acordado', [15], [2]).notNullable()
      table.decimal('comissao_imobiliaria', [15], [2]).notNullable()
      table.decimal('comissao_funcionario', [15], [2]).notNullable()
      table.date('data_transacao').notNullable()
      table.integer('codigo_imovel').notNullable()
      table.integer('codigo_cliente').notNullable()
      table.integer('codigo_funcionario').notNullable()
      table.integer('codigo_proprietario').notNullable()
      table.string('tipo_imovel', [30]).notNullable()
    })
  }

  down () {
    this.drop('histories')
  }
}

module.exports = HistorySchema
