"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class IsAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, auth, response }, next) {
    // call next to advance the request
    if (Number(auth.current.user.level) !== 1) {
      return response.json({
        status: 0,
        message: "only admin allowed to do this"
      });
    } else {
      await next();
    }
  }
}

module.exports = IsAdmin;
