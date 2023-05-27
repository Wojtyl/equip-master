const express = require("express");
const router = express.Router();
const login = require("../controllers/authController");

router.route("/login").post(login.login);
router.route("/signup").post(login.signup);

module.exports = router;
