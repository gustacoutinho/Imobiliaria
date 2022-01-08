"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with users
 */
class UserController {
 
  async index({ request, response, view }) {
    const users = await User.all();
    return response.json(users);
  }

  async singup({ request, response, auth }) {
    const userData = request.only(["login", "senha"]);

    try {
      const user = await User.create(userData);

      const token = await auth.generate(user);

      return response.json({
        status: "success",
        data: token,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "Ocorreu um erro inesperado!",
        technical: error,
      });
    }
  }

  async login({ request, response, auth }) {
    try {
      const token = await auth.attempt(
        request.input("login"),
        request.input("senha")
      );

      return response.json({
        status: "success",
        message: "Usuario logado!",
        data: token,
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Email ou senha inválido!",
      });
    }
  }

  async showUser({ params, response }) {
    try {  
      return response.json(await User.findOrFail(params.id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Usuário não encontrado!",
      });
    }
  }

  async updateProfile({ auth, request, response }) {
    const userData = request.only([
      "login",
      "senha",
    ]);

    try {
      const user = auth.current.user;

      user.login = userData.login;
      user.senha = userData.senha;

      await user.save();

      return response.json({
        status: "success",
        message: "Usuário atualizado!",
      });

    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar o seu perfil!",
      });
    }
  }

  async update({ auth, params, request, response }) {
    const userData = request.only([
      "login",
      "senha",
    ]);

    try {
      const user = await User.findOrFail(params.id);

      user.login = userData.login;
      user.senha = userData.senha;

      await user.save();
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar o seu cadastro!",
      });
    }
  }

  async destroy({ params, auth, request, response }) {
    try {
      const user = await User.findOrFail(params.id);

      await user.delete();

      return response.json({
        status: "success",
        message: "Usuário removido com sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Usuário não encontrado!",
      });
    }
  }

  async me({response, auth }) {
    try {
      const user = await User.query()
        .where("id", auth.current.user.id)
        .with("client", (builder) => {
        builder.with("property")
        })
        .firstOrFail();

      return response.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível mostrar o seu imóvel!",
      });
    }
  }
}


module.exports = UserController;
