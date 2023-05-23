const express = require("express");
const router = express.Router();

const deliveryController = require("./../controllers/deliveryController");

router
  .route("/")
  .get(deliveryController.getAllDeliveries)
  .post(deliveryController.createDelivery);

router.route("/:id").get(deliveryController.getDelivery);

module.exports = router;
