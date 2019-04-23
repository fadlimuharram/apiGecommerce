"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Transaction = use("App/Models/Transaction");
const Cart = use("App/Models/Cart");
const User = use("App/Models/User");
const { validate } = use("Validator");
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
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new transaction.
   * GET transactions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new transaction.
   * POST transactions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const rules = {
      address: "required",
      province: "required",
      province_id: "required",
      city: "required",
      city_id: "required",
      postal: "required",
      receiver: "required",
      phone: "required",
      courier: "required",
      weight: "required",
      eta: "required",
      shipping_price: "required",
      total_shopping: "required",
      total: "required"
    };

    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      return response
        .status(400)
        .json({ status: 0, message: validation.messages() });
    }

    const getUser = await auth.getUser();

    const transaction = new Transaction();
    transaction.address = request.input("address");
    transaction.province = request.input("province");
    transaction.province_id = request.input("province_id");
    transaction.city = request.input("city");
    transaction.city_id = request.input("city_id");
    transaction.postal = request.input("postal");
    transaction.receiver = request.input("receiver");
    transaction.phone = request.input("phone");
    transaction.courier = request.input("courier");
    transaction.weight = request.input("weight");
    transaction.eta = request.input("eta");
    transaction.shipping_price = request.input("shipping_price");
    transaction.total_shopping = request.input("total_shopping");
    transaction.total = request.input("total");
    transaction.user_id = getUser.id;
    await transaction.save();

    const cart = await User.find(getUser.id);
    await cart.cart().delete();

    return response.status(200).json({
      status: 1,
      data: transaction
    });
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
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing transaction.
   * GET transactions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update transaction details.
   * PUT or PATCH transactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a transaction with id.
   * DELETE transactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = TransactionController;
