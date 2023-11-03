import e from "express";
const colorRouter = e.Router();
import * as colorController from "../controllers/colorController";
import * as authController from "../controllers/authController";

colorRouter
  .route("/")
  .get(authController.auth, colorController.getAllDeliveries)
  .post(authController.auth, colorController.createDelivery);

  export { colorRouter }