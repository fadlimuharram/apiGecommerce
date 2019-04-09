"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CheckoutSchema extends Schema {
  up() {
    this.create("checkouts", table => {
      table.increments();
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable();
      table.text("message");

      table.timestamps();
    });
  }

  down() {
    this.drop("checkouts");
  }
}

module.exports = CheckoutSchema;
