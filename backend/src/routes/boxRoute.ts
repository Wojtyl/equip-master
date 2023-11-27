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
    .get(authController.auth, boxController.getBox())
    .post(authController.auth, boxController.addProductToBox())
    .delete(authController.auth, boxController.deleteBox());

boxRouter
    .route('/:id/close')
    .post(authController.auth, boxController.closeBox())

boxRouter
    .route("/:id/removeProduct")
    .patch(authController.auth, boxController.removeProductFromBox())

export { boxRouter };