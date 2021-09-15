"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const users = await User.all();

    return response.json(users);
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
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
        data: token,
      });
    } catch (error) {
      console.log(error)
      return error.message
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    try {
      return response.json(await User.findOrFail(params.id));
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Usuário não encontrado!",
      });
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
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
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Não foi possível atualizar o seu perfil!",
      });
    }
  }
  // PUT http://localhost:3333/users/3
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

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, request, response }) {
    try {
      const user = await User.findOrFail(params.id);

      await user.delete();

      return response.json({
        status: "success",
        message: "Usuário removido com o sucesso!",
      });
    } catch (error) {
      return response.status(404).json({
        status: "error",
        message: "Usuário não encontrado!",
      });
    }
  }
}

module.exports = UserController;
