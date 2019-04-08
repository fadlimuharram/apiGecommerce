"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Category = use("App/Models/Category");
const { validate } = use("Validator");
const Helpers = use("Helpers");
const fs = require("fs");
/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all products.
   * GET products
   */
  async index({ request, response, view }) {
    try {
      let pagination = request.only(["page", "limit"]);
      const page = parseInt(pagination.page, 10) || 1;
      const limit = parseInt(pagination.limit, 10) || 10;
      const categories = await Category.query().paginate(page, limit);
      categories.toJSON();
      return response.status(200).json({
        ...categories,
        status: 1
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * Create/save a new category.
   * POST categories
   */
  async store({ request, response }) {
    const rules = {
      name: "required|string"
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

    const name = coverPic.clientName;
    const ext = name.split(".")[1];
    const ts = new Date().valueOf();
    const fileName = "category" + ts + "." + ext;

    await coverPic.move(Helpers.publicPath("uploads"), {
      name: fileName
    });

    if (!coverPic.moved()) {
      return response
        .status(400)
        .json({ status: 0, message: coverPic.error() });
    } else {
      const category = new Category();
      category.name = request.input("name");
      category.cover = fileName;
      await category.save();

      return response.json({
        status: 1,
        data: category
      });
    }
  }

  /**
   * Display a single category.
   * GET categories/:id
   */
  async show({ params, request, response, view }) {
    const category = await Category.find(params.id);

    return response.status(200).json({
      data: category,
      status: 1
    });
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   */
  async update({ params, request, response }) {
    const categoryInfo = request.only(["name"]);

    const category = await Category.find(params.id);
    category.name = request.input("name");

    const coverPic = request.file("cover", {
      type: ["image"],
      size: "2mb",
      extnames: ["png", "jpg"]
    });

    if (coverPic === null) {
      await category.save();
    } else {
      const name = coverPic.clientName;
      const ext = name.split(".")[1];
      const ts = new Date().valueOf();
      const fileName = "category" + ts + "." + ext;

      await coverPic.move(Helpers.publicPath("uploads"), {
        name: fileName
      });

      const linkOldPicture =
        Helpers.publicPath("uploads") + "/" + category.cover;
      fs.unlink(linkOldPicture, function(err) {
        if (err) response.status(400).json({ status: 0, error: err });
      });
      category.cover = fileName;
      await category.save();
    }

    return response.json({
      status: 1,
      data: category
    });
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   */
  async destroy({ params, request, response }) {
    const category = await Category.find(params.id);
    const oldCategory = category;
    if (!category) {
      return response.status(404).json({ status: 0 });
    }

    const oldPicture = Helpers.publicPath("uploads") + "/" + category.cover;
    fs.unlink(oldPicture, function(err) {
      if (err) response.status(400).json({ status: 0, error: err });
    });

    await category.delete();
    return response.status(200).json({
      status: 1,
      data: oldCategory
    });
  }
}

module.exports = CategoryController;

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *        - Categories
 *     summary: Show a list of all categories.
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
 * /categories/{categoryId}:
 *   get:
 *     tags:
 *        - Categories
 *     summary: Find categories by ID.
 *     operationId: getCategoryById
 *     produces:
 *        - application/json
 *     parameters:
 *        - name: categoryId
 *          in: path
 *          description: ID of category
 *          required: true
 *          type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *
 */

/**
 * @swagger
 * /categories:
 *    post:
 *      tags:
 *        - Categories
 *      summary: Create/save a new category
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: formData
 *          name: cover
 *          type: file
 *          required: true
 *          description: The cover of category picture file.
 *        - in: formData
 *          name: name
 *          type: string
 *          required: true
 *          description: The name of category.
 *      responses:
 *        400:
 *          description: failure operation
 *        200:
 *          description: successful operation
 *
 */

/**
 * @swagger
 * /categories/{categoryId}:
 *    patch:
 *      tags:
 *        - Categories
 *      summary: Update an existing categories
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          type: integer
 *          description: ID of category.
 *        - in: formData
 *          name: cover
 *          type: file
 *          description: The cover of category picture file.
 *        - in: formData
 *          name: name
 *          type: string
 *          description: The name of category.
 *      responses:
 *        400:
 *          description: failure operation
 *        200:
 *          description: successful operation
 *
 */

/**
 * @swagger
 * /categories/{categoryId}:
 *    delete:
 *      tags:
 *        - Categories
 *      summary: delete an existing category with the images
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          type: integer
 *          description: ID of category.
 *      responses:
 *        400:
 *          description: failure operation
 *        200:
 *          description: successful operation
 *
 */
