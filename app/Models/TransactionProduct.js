"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class TransactionProduct extends Model {
  transaction() {
    return this.belongsTo("App/Models/Transaction");
  }
}

module.exports = TransactionProduct;
