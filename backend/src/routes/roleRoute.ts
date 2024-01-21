import e from "express";
import * as authController from "../controllers/authController";
import * as roleController from "../controllers/roleController";

const roleRouter = e.Router();

roleRouter.route("")
    .get(authController.auth, roleController.getCurrentUserRole());

roleRouter.route("/:id")
    .get(authController.auth, roleController.getUserRoleById())
    .patch(authController.auth, roleController.updateUserRole());

export { roleRouter };
