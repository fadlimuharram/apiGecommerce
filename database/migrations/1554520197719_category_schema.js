"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CategorySchema extends Schema {
  up() {
    this.create("categories", table => {
      table.increments();
      table.string("name", 30).notNullable();
      table.string("cover").notNullable();

      table.timestamps();
    });

    this.alter("products", table => {
      table
        .foreign("category_id")
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.drop("categories");
  }
}

module.exports = CategorySchema;
