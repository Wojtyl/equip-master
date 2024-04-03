import e from "express";
import * as authController from "../controllers/authController";
import { BoxController } from "../controllers/boxController";

const boxRouter = e.Router();
const boxController = new BoxController();

boxRouter
  .route("/")
  .get(authController.auth, boxController.getAllBoxes())
  .post(authController.auth, boxController.createBox());

boxRouter
    .route("/:id")
    .get(authController.auth, boxController.getBoxWithProductDetails())
    .post(authController.auth, boxController.addProductToBox())
    .delete(authController.auth, boxController.deleteBox());

boxRouter
    .route('/:id/close')
    .post(authController.auth, boxController.closeBox())

boxRouter
    .route('/:id/open')
    .post(authController.auth, boxController.openBox())

boxRouter
    .route("/:id/product/:productId")
    .patch(authController.auth, boxController.editProductInBox())
    .delete(authController.auth, boxController.removeProductFromBox())

export { boxRouter };