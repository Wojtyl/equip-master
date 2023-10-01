import e from "express";
const boxRouter = e.Router();
import * as boxController from "../controllers/boxController";
import * as authController from "../controllers/authController";

boxRouter
  .route("/")
  // .get(authController.auth, boxController.getAllBoxes)
  .post(authController.auth, boxController.createBox);

boxRouter
  .route("/:id")
  .get(authController.auth, boxController.getBox())
  // .delete(authController.auth, deliveryController.deleteDelivery)

export { boxRouter };