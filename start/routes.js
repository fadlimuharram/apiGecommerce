"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  Route.resource("products", "V1/ProductController")
    .apiOnly()
    .except(["index", "show"]);
  Route.resource("categories", "V1/CategoryController")
    .apiOnly()
    .except(["index", "show"]);
  Route.resource("checkout", "V1/CheckoutController").apiOnly();
})
  .prefix("api/v1")
  .middleware("auth");

Route.group(() => {
  Route.resource("products", "V1/ProductController")
    .apiOnly()
    .except(["store", "update", "destroy"]);
  Route.resource("categories", "V1/CategoryController")
    .apiOnly()
    .except(["store", "update", "destroy"]);
}).prefix("api/v1");

Route.group(() => {
  Route.post("register", "V1/AuthController.register");
  Route.post("login", "V1/AUthController.login");
}).prefix("auth");

// Route.resource("checkout", "V1/CheckoutController").prefix("api/v1");

/**
 * @swagger
 * securityDefinitions:
 *    api_key:
 *        type: apiKey
 *        name: Authorization
 *        in: header
 *
 */
