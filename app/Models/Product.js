"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  pictures() {
    return this.hasMany("App/Models/Picture");
  }
  category() {
    return this.hasOne("App/Models/Category");
  }
  checkout() {
    return this.hasMany("App/Models/Checkout");
  }
}

module.exports = Product;
