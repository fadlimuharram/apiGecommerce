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
  Route.resource("carts", "V1/CartController").apiOnly();
  Route.resource("addresses", "V1/AddressController").apiOnly();
  Route.get("users/data", "V1/AuthController.getProfile");
  Route.get("province", "V1/ThirdpartyApiController.getProvince");
  Route.get("city/:id", "V1/ThirdpartyApiController.getCity");
  Route.patch("users", "V1/AuthController.editProfile");
  Route.post("cost", "V1/ThirdpartyApiController.getPrice");
  Route.post("transactions", "V1/TransactionController.store");
  Route.post(
    "transactions/:id/product",
    "V1/TransactionProductController.store"
  );
})
  .prefix("api/v1")
  .middleware(["auth", "isAdmin"]);

Route.group(() => {
  Route.resource("products", "V1/ProductController")
    .apiOnly()
    .except(["store", "update", "destroy"]);
  Route.get("products/category/:id", "V1/ProductController.getByCategory");
  Route.post("products/search", "V1/ProductController.getBySearch");
  Route.resource("categories", "V1/CategoryController")
    .apiOnly()
    .except(["store", "update", "destroy"]);

  Route.post("users/register", "V1/AuthController.register");
  Route.post("users/login", "V1/AUthController.login");
  Route.post("users/refresh", "V1/AuthCOntroller.generateRefreshToken");
}).prefix("api/v1");

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
