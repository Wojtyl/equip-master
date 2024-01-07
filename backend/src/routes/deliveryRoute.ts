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
  .delete(authController.auth, deliveryController.deleteDelivery())

deliveryRouter
    .route("/:id/close")
    .post(authController.auth, deliveryController.closeDelivery());

deliveryRouter
    .route("/:id/reopen")
    .post(authController.auth, deliveryController.reopenDelivery());

deliveryRouter
    .route("/:id/summary")
    .get(authController.auth, deliveryController.getDeliverySummary())

export { deliveryRouter };
