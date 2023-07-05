import jwt from "jsonwebtoken";

export const generateToken = (username) => {
  return jwt.sign(username, process.env.JWT_ECRET, { expiresIn: "30s" });
};
