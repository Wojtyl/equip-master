const express = require("express");
const deliveryRouter = express.Router();

const deliveryController = require("./../controllers/deliveryController");

deliveryRouter
  .route("/")
  .get(deliveryController.getAllDeliveries)
  .post(deliveryController.createDelivery);

deliveryRouter.route("/:id").get(deliveryController.getDelivery);

module.exports = deliveryRouter;

export { deliveryRouter }