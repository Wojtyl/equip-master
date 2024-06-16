import e from "express";
import * as authController from "../controllers/authController";
import { ProfileController } from "../controllers/profileController";

const profileRouter = e.Router();

const profileController = new ProfileController();

profileRouter
    .route("/")
    .get(authController.auth, profileController.getProfileDetails())
    .patch(authController.auth, profileController.updateProfile())

export { profileRouter };
