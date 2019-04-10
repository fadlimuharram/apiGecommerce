"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Cart = use("App/Models/Cart");
const { validate } = use("Validator");

/**
 * Resourceful controller for interacting with cards
 */
class CartController {
  /**
   * Show a list of all cards.
   * GET cards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    const getUser = await auth.getUser();
    const cart = await Cart.query()
      .with("user")
      .with("product")
      .where("user_id", getUser.id)
      .fetch();

    return response.json({ status: 1, data: cart });
  }

  /**
   * Render a form to be used for creating a new card.
   * GET cards/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new card.
   * POST cards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const getUser = await auth.getUser();

    const rules = {
      product_id: "required",
      quantity: "required",
      message: "string"
    };

    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      return response
        .status(400)
        .json({ status: 0, message: validation.messages() });
    }

    const product_id = request.input("product_id");
    const user_id = getUser.id;
    const quantity = request.input("quantity");
    const message = request.input("message");

    // check if user already insert the same cart
    const checkCart = await Cart.query()
      .where("product_id", product_id)
      .where("user_id", user_id)
      .fetch();

    // return response.json({ tes: checkCart.rows.length });

    if (checkCart.rows.length === 0) {
      const cart = new Cart();
      cart.product_id = product_id;
      cart.user_id = user_id;
      cart.quantity = quantity;
      if (message) cart.message = message;
      await cart.save();
      return response.json({
        status: 1,
        condition: "added to new cart",
        ...cart
      });
    } else {
      const cart = await Cart.find(checkCart.rows[0].id);
      cart.quantity = cart.quantity + quantity;
      await cart.save();
      return response.json({
        status: 1,
        condition: "added quantity",
        data: cart
      });
    }
  }

  /**
   * Display a single card.
   * GET cards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing card.
   * GET cards/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update card details.
   * PUT or PATCH cards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a card with id.
   * DELETE cards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = CartController;

/**
 * @swagger
 * /cards:
 *   get:
 *     tags:
 *        - Card
 *     summary: Show a list of all card by authenticate user.
 *     produces:
 *        - application/json
 *     parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: int
 *        required: true
 *        description: set page limit
 *      - in: query
 *        name: page
 *        schema:
 *          type: int
 *        required: true
 *        description: set page
 *     responses:
 *       200:
 *         description: successful operation
 *
 */
