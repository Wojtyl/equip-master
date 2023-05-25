const jwt = require("jsonwebtoken");

exports.generateToken = (username) => {
  return jwt.sign(username, process.env.JWT_ECRET, { expiresIn: "30s" });
};
