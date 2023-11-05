import e from "express";
import * as boxController from "../controllers/boxController";
import * as authController from "../controllers/authController";
import * as generalController from "../controllers/generalController";
import { Box } from "../schemas/boxModel";
const boxRouter = e.Router();

boxRouter
  .route("/")
  .get(authController.auth, boxController.getAllBoxes())
  .post(authController.auth, boxController.createBox);

boxRouter
  .route("/:id")
  .get(authController.auth, boxController.getBox())
  .delete(authController.auth, generalController.deleteOne(Box))

export { boxRouter };