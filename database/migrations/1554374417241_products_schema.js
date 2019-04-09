"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductsSchema extends Schema {
  up() {
    this.create("products", table => {
      table.increments();
      table.string("name", 50).notNullable();
      table.double("price").notNullable();
      table.text("description").notNullable();
      table.integer("quantity").notNullable();
      table.integer("category_id").unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop("products");
  }
}

module.exports = ProductsSchema;
