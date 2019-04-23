"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TransactionSchema extends Schema {
  up() {
    this.create("transactions", table => {
      table.increments();
      table.string("address");
      table.string("province");
      table.string("province_id");
      table.string("city");
      table.string("city_id");
      table.string("postal");
      table.string("receiver");
      table.string("phone");
      table.string("courier");
      table.string("weight");
      table.string("eta");
      table.string("shipping_price");
      table.string("total_shopping");
      table.string("total");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("transactions");
  }
}

module.exports = TransactionSchema;
