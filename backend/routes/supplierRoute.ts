import e from "express";

const supplierRouter = e.Router();

// const supplierController = require("../controllers/supplierController");
import * as supplierController from "../controllers/supplierController"
const authController = require("../controllers/authController");



supplierRouter
  .route("/")
  .get(authController.auth, supplierController.getAllSuppliers)
  .post(authController.auth, supplierController.createSupplier)
  .delete(supplierController.deleteAllSuppliers);

supplierRouter
  .route("/:id")
  .get(supplierController.getSupplier)
  .patch(supplierController.updateSupplier)
  .delete(supplierController.deleteSupplier);
module.exports = supplierRouter;

export { supplierRouter }
