import e from "express";

import * as supplierController from "../controllers/supplierController";
import * as authController from "../controllers/authController";

const supplierRouter = e.Router();

supplierRouter
  .route("/")
  // .get(authController.auth, supplierController.getAllSuppliers)
  .get(authController.auth, supplierController.findSupplierWithproducts)
  .post(authController.auth, supplierController.createSupplier)
  .delete(supplierController.deleteAllSuppliers);

supplierRouter
  .route("/:id")
  .get(supplierController.getSupplier)
  .patch(supplierController.updateSupplier)
  .delete(supplierController.deleteSupplier);

export { supplierRouter };
