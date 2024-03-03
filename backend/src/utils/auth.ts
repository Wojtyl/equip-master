import jwt from "jsonwebtoken";

export const generateToken = (username) => {
  return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: "30s" });
};
