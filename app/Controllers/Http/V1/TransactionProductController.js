"use strict";
const TransactionProduct = use("App/Models/TransactionProduct");
const { validate } = use("Validator");
class TransactionProductController {
  async store({ request, params, response }) {
    const rules = {
      name: "required",
      price: "required",
      quantity: "required",
      weight: "required"
    };

    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      return response
        .status(400)
        .json({ status: 0, message: validation.messages() });
    }

    const transaction = new TransactionProduct();
    transaction.name = request.input("name");
    transaction.price = request.input("price");
    transaction.quantity = request.input("quantity");
    transaction.weight = request.input("weight");
    transaction.transaction_id = params.id;
    await transaction.save();

    return response.status(200).json({
      status: 1,
      data: transaction
    });
  }
}

module.exports = TransactionProductController;
