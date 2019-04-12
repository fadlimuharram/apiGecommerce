"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressSchema extends Schema {
  up() {
    this.create("addresses", table => {
      table.increments();
      table.string("title", 30);
      table.string("address");
      table.string("province");
      table.string("province_id");
      table.string("city");
      table.string("city_id");
      table.string("postal");
      table.string("receiver");
      table.string("phone");
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
    this.drop("addresses");
  }
}

module.exports = AddressSchema;
