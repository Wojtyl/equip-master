import e from "express";
const deliveryRouter = e.Router();
import * as deliveryController from "../controllers/deliveryController";
// const deliveryController = require("./../controllers/deliveryController");

deliveryRouter
  .route("/")
  .get(deliveryController.getAllDeliveries)
  .post(deliveryController.createDelivery);

deliveryRouter.route("/:id").get(deliveryController.getDelivery);

export { deliveryRouter };
