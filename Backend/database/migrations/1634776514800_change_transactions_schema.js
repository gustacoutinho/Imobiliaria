'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeTransactionsSchema extends Schema {
  up () {
    this.table('trasactions', (table) => {
      table.integer('num_contrato').notNullable().unsigned().unique().alter()
    })
    this.table('trasactions', (table) => {
      table.integer('comissao_funcionario').nullable().alter()
    })
    this.table('trasactions', (table) => {
      table.integer('comissao_imobiliaria').nullable().alter()
    })
  }

  down () {
    this.table('trasactions', (table) => {
      table.integer('num_contrato').notNullable().unsigned().alter()
      table.integer('comissao_funcionario').notNullable().alter()
      table.integer('comissao_imobiliaria').notNullable().alter()
    })
  }
}

module.exports = ChangeTransactionsSchema
