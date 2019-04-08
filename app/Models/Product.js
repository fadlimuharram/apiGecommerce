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
}

module.exports = Product;
