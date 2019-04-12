"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Product = use("App/Models/Product");
const Picture = use("App/Models/Picture");
const Database = use("Database");

const { validate } = use("Validator");
const Helpers = use("Helpers");
const fs = require("fs");

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   */
  async index({ request, response, view }) {
    try {
      let pagination = request.only(["page", "limit"]);
      const page = parseInt(pagination.page, 10) || 1;
      const limit = parseInt(pagination.limit, 10) || 10;
      const products = await Product.query()
        .with("pictures")
        .paginate(page, limit);
      products.toJSON();

      return response.status(200).json({
        ...products,
        status: 1
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * Show a list of all products.
   * GET products by category
   */
  async getByCategory({ request, response, params }) {
    try {
      let pagination = request.only(["page", "limit"]);
      const page = parseInt(pagination.page, 10) || 1;
      const limit = parseInt(pagination.limit, 10) || 10;
      const products = await Product.query()
        .where("category_id", params.id)
        .with("pictures")
        .paginate(page, limit);

      return response.status(200).json({
        ...products,
        status: 1
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new product.
   * POST products
   */
  async store({ request, response }) {
    const rules = {
      name: "required|string",
      price: "required|number",
      description: "required",
      category_id: "required",
      quantity: "required"
    };

    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      return response
        .status(400)
        .json({ status: 0, message: validation.messages() });
    }

    const coverPic = request.file("cover", {
      type: ["image"],
      size: "2mb",
      extnames: ["png", "jpg"]
    });

    if (coverPic === null) {
      return response.status(400).json({
        status: 0,
        message: "Image is required"
      });
    }

    let loop = 1;
    const arrPic = [];

    await coverPic.moveAll(Helpers.publicPath("uploads"), file => {
      let name = file.clientName;
      let ext = name.split(".")[1];
      let ts = new Date().valueOf();
      let fileName = "product" + ts + loop + "." + ext;
      loop++;
      arrPic.push(fileName);
      return {
        name: fileName
      };
    });

    const product = new Product();
    product.name = request.input("name");
    product.price = request.input("price");
    product.description = request.input("description");
    product.category_id = request.input("category_id");
    product.quantity = request.input("quantity");
    await product.save();

    let dataPicture = [];

    const movedImage = coverPic.movedList();
    await Promise.all(
      movedImage.map(async file => {
        const picture = new Picture();
        picture.cover = file.fileName;
        picture.product_id = product.id;
        await picture.save();
        dataPicture.push(picture);
      })
    );

    const returnData = {
      product: product,
      pictures: dataPicture
    };

    return response.status(200).json({ status: 1, data: returnData });
  }

  /**
   * Display a single product.
   * GET products/:id
   */
  async show({ params, request, response, view }) {
    const product = await Product.query()
      .with("pictures")
      .where("id", params.id)
      .fetch();

    return response.status(200).json({
      ...product,
      status: 1
    });
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update product details.
   * PUT or PATCH products/:id
   */
  async update({ params, request, response }) {
    const rules = {
      name: "string",
      price: "number",
      description: "string",
      category_id: "number",
      quantity: "number"
    };

    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      return response
        .status(400)
        .json({ status: 0, message: validation.messages() });
    }

    const reqName = request.input("name");
    const reqPrice = request.input("price");
    const reqDescription = request.input("description");
    const reqCategoryId = request.input("category_id");
    const reqQuantity = request.input("quantity");

    const product = await Product.find(params.id);
    product.name = reqName !== "" ? reqName : product.name;
    product.price = reqPrice !== "" ? reqPrice : product.price;
    product.description =
      reqDescription !== "" ? reqDescription : product.description;
    product.category_id =
      reqCategoryId !== "" ? reqCategoryId : product.category_id;
    product.save();
    product.quantity !== "" ? reqQuantity : product.reqQuantity;

    return response.json({
      status: 1,
      data: product
    });
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   */
  async destroy({ params, request, response }) {
    const product = await Product.find(params.id);
    const oldProduct = product;

    const query = Database.table("pictures");

    const findPicture = await query.where("product_id", product.id);

    if (!product) return response.status(404).json({ status: 0 });

    findPicture.map(async (val, i) => {
      const oldPicture = Helpers.publicPath("uploads") + "/" + val.cover;
      fs.unlink(oldPicture, err => {
        if (err) response.status(400).json({ status: 0, error: err });
      });
      const picture = await Picture.find(val.id);
      await picture.delete();
    });
    await product.delete();
    return response.json({
      statue: 1,
      data: oldProduct
    });
  }
}

module.exports = ProductController;

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *        - Products
 *     summary: Show a list of all product.
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
 * /products/{productId}:
 *   get:
 *     tags:
 *        - Products
 *     summary: Find product by ID.
 *     operationId: getProductById
 *     produces:
 *        - application/json
 *     parameters:
 *        - name: productId
 *          in: path
 *          description: ID of product
 *          required: true
 *          type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *
 */

/**
 * @swagger
 * /products:
 *    post:
 *      tags:
 *        - Products
 *      summary: Create/save a new Product
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: formData
 *          name: cover
 *          type: file
 *          required: true
 *          description: "The cover of product pictures file. use it with array like cover[]"
 *        - in: formData
 *          name: name
 *          type: string
 *          required: true
 *          description: The name of product.
 *        - in: formData
 *          name: price
 *          type: number
 *          required: true
 *          description: The price of product.
 *        - in: formData
 *          name: description
 *          type: text
 *          required: true
 *          description: The description of product.
 *        - in: formData
 *          name: category_id
 *          type: integer
 *          required: true
 *          description: The foreign key of category
 *      responses:
 *        400:
 *          description: failure operation
 *        200:
 *          description: successful operation
 *
 */

/**
 * @swagger
 * /products/{productId}:
 *    patch:
 *      tags:
 *        - Products
 *      summary: Update an existing product, but not the image
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: productId
 *          type: integer
 *          description: ID of product.
 *        - in: body
 *          name: name
 *          type: string
 *          description: The name of product.
 *        - in: body
 *          name: price
 *          type: number
 *          description: the price of product
 *        - in: body
 *          name: description
 *          type: string
 *          description: the product description
 *        - in: body
 *          name: category_id
 *          type: number
 *          dscription: the foreign key of category
 *      responses:
 *        400:
 *          description: failure operation
 *        200:
 *          description: successful operation
 *
 */

/**
 * @swagger
 * /products/{productId}:
 *    delete:
 *      tags:
 *        - Products
 *      summary: delete an existing product with the images
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: productId
 *          type: integer
 *          description: ID of product.
 *      responses:
 *        400:
 *          description: failure operation
 *        200:
 *          description: successful operation
 *
 */
