import e from "express";
const categoryRouter = e.Router();
import * as categoryController from "../controllers/categoryController";
import * as authController from "../controllers/authController";

categoryRouter
  .route("/")
  .get(authController.auth, categoryController.getAllCategories)
  .post(authController.auth, categoryController.createCategory);

  export { categoryRouter }