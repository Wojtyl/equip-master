import e from "express";
import * as deliveryController from "../controllers/deliveryController";
import * as authController from "../controllers/authController";
const deliveryRouter = e.Router();

deliveryRouter
  .route("/")
  .get(authController.auth, deliveryController.getAllDeliveries)
  .post(authController.auth, deliveryController.createDelivery);

deliveryRouter
  .route("/:id")
  .get(authController.auth, deliveryController.getDeliveryDetails())
  .delete(authController.auth, deliveryController.deleteDelivery)

export { deliveryRouter };
