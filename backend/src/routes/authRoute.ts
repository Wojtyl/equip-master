import e from "express";
import * as authController from "../controllers/authController";

const authRouter = e.Router();

authRouter.route("/login").post(authController.login);
authRouter.route("/signup").post(authController.signup);
authRouter.route("/isloggedin").get(authController.isLoggedIn);
authRouter.route("/resetPassword").post(authController.resetPassword)
authRouter.route("/newPasswordReset").post(authController.setNewPassword)

export { authRouter };
