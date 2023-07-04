const express = require("express");
const authRouter = express.Router();
const login = require("../controllers/authController");

authRouter.route("/login").post(login.login);
authRouter.route("/signup").post(login.signup);
authRouter.route("/isloggedin").get(login.isLoggedIn);

module.exports = authRouter;

export { authRouter }