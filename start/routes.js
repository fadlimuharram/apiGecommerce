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
  Route.resource("products", "V1/ProductController").except(["edit", "create"]);
  Route.resource("categories", "V1/CategoryController").except([
    "edit",
    "create"
  ]);
})
  .prefix("api/v1")
  .middleware("auth");

Route.group(() => {
  Route.post("register", "V1/AuthController.register");
  Route.post("login", "V1/AUthController.login");
}).prefix("auth");
