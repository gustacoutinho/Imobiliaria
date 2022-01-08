'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Transaction = use("App/Models/trasaction");
const History = use("App/Models/history");
const Property = use("App/Models/property");


/**
 * Resourceful controller for interacting with transactions
 */
class TransactionController {
  /**
   * Show a list of all transactions.
   * GET transactions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({response}) {
    const transaction = await Transaction.all();
    return response.json(transaction);
  }

  /**
   * Render a form to be used for creating a new transaction.
   * GET transactions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async createRent ({request, response}) {
    const {person_id, person_id1,  indication_id,  ...transactionData} = request.only([
      "num_contrato", "valor_acordado","employee_id", "client_id", "payment_id",
       "property_id", "person_id", "person_id1", "indication_id"]);
    
    try{
      const procura = await Transaction.query().where("property_id", transactionData.property_id).firstOrFail()
      const property = await Property.query().where("id", transactionData.property_id).firstOrFail()
      const property1 = await property.client().ids()
      const teste = property1.toString()
      //verifica se existe outra transação deste imovél, e se houve, transfere os dados para o históricos com sucesso!
      if(procura.property_id == transactionData.property_id)     
        try {
          const history = await new History; 
          history.num_contrato = procura.num_contrato;
          history.valor_acordado = procura.valor_acordado;
          history.comissao_funcionario = (procura.valor_acordado*1)/100
          history.comissao_imobiliaria = (procura.valor_acordado*5)/100
          history.data_transacao = procura.updated_at;
          history.codigo_imovel = procura.property_id;
          history.codigo_cliente = procura.client_id;
          history.codigo_funcionario = procura.employee_id;
          history.codigo_proprietario = teste;
          history.tipo_imovel = property.tipo_imovel;
          await history.save();
          if(procura.num_contrato == transactionData.num_contrato){ 
            return response.status(404).json({
              status: "error",
              message: "Múmero de contrato já cadastrado!",
            });
          }else{
          procura.num_contrato = transactionData.num_contrato
          procura.valor_acordado = transactionData.valor_acordado;
          procura.comissao_funcionario = (transactionData.valor_acordado*1)/100
          procura.comissao_imobiliaria = (transactionData.valor_acordado*5)/100
          procura.employee_id = transactionData.employee_id;
          procura.client_id = transactionData.client_id;
          procura.payment_id = transactionData.payment_id;
          await procura.save();
          return response.json({
            status: "success",
            message: "Transação atualizada!",
          })}
       } catch (error) {
            return response.status(404).json({
              status: "error",
              message: "Não foi possível atualizar sua transação!",
            });
    //caso não exista nenhuma transação daquele imóvel, ele cria uma nova.
    }}catch (error) {
    try {
      const transaction = await Transaction.create(transactionData);
      await transaction.person().attach(person_id)
      await transaction.person1().attach(person_id1)
      await transaction.indication().attach(indication_id)
      await transaction.load('indication')
      await transaction.load('person')
      transaction.comissao_funcionario = (transactionData.valor_acordado*1)/100
      transaction.comissao_imobiliaria = (transactionData.valor_acordado*5)/100
      await transaction.save()

      return response.json({
        status: "success",
        message: "Transação completa!",
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "Ocorreu um erro inesperado!",
        technical: error,
      });
    }}
  }
   async createSale ({request, response}) {
    const {indication_id,  ...transactionData} = request.only([
      "num_contrato", "valor_acordado","employee_id", "client_id", "payment_id",
       "property_id", "indication_id"]);
    try{
      const procura = await Transaction.query().where("property_id", transactionData.property_id).firstOrFail()
      const property = await Property.query().where("id", transactionData.property_id).firstOrFail()
     
      //verifica se existe outra transação deste imovél, e se houve, transfere os dados para o históricos com sucesso!
      if(procura.property_id == transactionData.property_id)     
        try {
          const history = await new History; 
          history.num_contrato = procura.num_contrato;
          history.valor_acordado = procura.valor_acordado;
          history.comissao_funcionario = (procura.valor_acordado*1)/100
          history.comissao_imobiliaria = (procura.valor_acordado*5)/100
          history.data_transacao = procura.updated_at;
          history.codigo_imovel = procura.property_id;
          history.codigo_cliente = procura.client_id;
          history.codigo_funcionario = procura.employee_id;
          history.codigo_proprietario = transactionData.client_id;
          history.tipo_imovel = property.tipo_imovel;
          await history.save();
          if(procura.num_contrato == transactionData.num_contrato){ 
            return response.status(404).json({
              status: "error",
              message: "Múmero de contrato já cadastrado!",
            });
          }else{//cadastra uma nova transação referente a um imóvel ja registrado
          procura.num_contrato = transactionData.num_contrato
          procura.valor_acordado = transactionData.valor_acordado;
          procura.comissao_funcionario = (transactionData.valor_acordado*1)/100
          procura.comissao_imobiliaria = (transactionData.valor_acordado*5)/100
          procura.employee_id = transactionData.employee_id;
          procura.client_id = transactionData.client_id;
          procura.payment_id = transactionData.payment_id;
          await procura.save();
          await property.client().sync(transactionData.client_id) 
          await property.load('client')
          return response.json({
            status: "success",
            message: "Transação atualizada!",
          })}
       } catch (error) {
            return response.status(404).json({
              status: "error",
              message: "Não foi possível atualizar sua transação!",
            });
    //caso não exista nenhuma transação daquele imóvel, ele cria uma nova.
    }}catch (error) {
    try {
      const transaction = await Transaction.create(transactionData);
      await transaction.indication().attach(indication_id)
      await transaction.load('indication')
      transaction.comissao_funcionario = (transactionData.valor_acordado*1)/100
      transaction.comissao_imobiliaria = (transactionData.valor_acordado*5)/100
      await transaction.save()

      return response.json({
        status: "success",
        message: "Transação completa!",
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "Ocorreu um erro inesperado!",
        technical: error,
      });
    }}
  }
  /**
   * Display a single transaction.
   * GET transactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show({ params, response }) {
    try {
      const transaction = await Transaction.query()
        .where("id", params.id)
        .with("employee")
        .with("client")
        .with("payment")
        .with("property", (builder) => {
          builder.with("terrain");
          builder.with("house"); 
          builder.with("apartment"); 
          builder.with("comercialRoom"); 
        })
        .with("person")
        .with("indication")
        .firstOrFail()
      return response.json({
        status: "success",
        data: transaction,
      })
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Transação não encontrada!",
      });
    }
  }
  /**
   * Update transaction details.
   * PUT or PATCH transactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  //Tirar dúvida referente histórico e updates em property e transactions. historico referente as transações ou aos imóveis
   async update({ params, request, response }) {
    const transactionData = request.only(["num_contrato", "valor_acordado", "comissao_imobiliaria", "comissao_funcionario",
    "employee_id", "client_id", "payment_id"]);

    try {
      const transaction = await Transaction.findOrFail(params.id);
      transaction.num_contrato = transactionData.num_contrato;
      transaction.valor_acordado = transactionData.valor_acordado;
      transaction.comissao_funcionario = (transactionData.valor_acordado*1)/100
      transaction.comissao_imobiliaria = (transactionData.valor_acordado*5)/100
      transaction.employee_id = transactionData.employee_id;
      transaction.client_id = transactionData.client_id;
      transaction.payment_id = transactionData.payment_id;
      
      await transaction.save();

      return response.json({
        status: "success",
        message: "Transação atualizada!",
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar sua transação!",
      });
    }
  }

  /**
   * Delete a transaction with id.
   * DELETE transactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async destroy ({ params, response }) {
    try {
      const transaction = await Transaction.findOrFail(params.id);

      await transaction.delete();

      return response.json({
        status: "success",
        message: "Transação removida com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Transação não encontrada!",
      });
    }
  }
}

module.exports = TransactionController
