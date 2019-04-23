"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TransactionProductSchema extends Schema {
  up() {
    this.create("transaction_products", table => {
      table.increments();
      table.string("name", 50).notNullable();
      table.double("price").notNullable();
      table.integer("quantity").notNullable();
      table.double("weight").notNullable();
      table
        .integer("transaction_id")
        .unsigned()
        .references("id")
        .inTable("transactions")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("transaction_products");
  }
}

module.exports = TransactionProductSchema;
