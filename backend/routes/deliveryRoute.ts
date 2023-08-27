import e from "express";
const deliveryRouter = e.Router();
import * as deliveryController from "../controllers/deliveryController";
import * as authController from "../controllers/authController";

deliveryRouter
  .route("/")
  .get(authController.auth, deliveryController.getAllDeliveries)
  .post(authController.auth, deliveryController.createDelivery);

deliveryRouter
  .route("/:id")
  .get(authController.auth, deliveryController.getDelivery)
  .delete(authController.auth, deliveryController.deleteDelivery)

export { deliveryRouter };
