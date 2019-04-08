"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PictureSchema extends Schema {
  up() {
    this.create("pictures", table => {
      table.increments();
      table.string("cover").notNullable();
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("pictures");
  }
}

module.exports = PictureSchema;
