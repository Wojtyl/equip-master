import e from "express";

import * as supplierController from "../controllers/supplierController";
import * as authController from "../controllers/authController";
import * as generalController from "../controllers/generalController";
import {Supplier} from "../models/supplierModel";

const supplierRouter = e.Router();

supplierRouter
  .route("/")
  .get(authController.auth, supplierController.findSupplierWithProducts())
  .post(authController.auth, generalController.getOne(Supplier))
  .delete(authController.auth, generalController.deleteAll(Supplier));

supplierRouter
  .route("/:id")
  .get(generalController.getOne(Supplier))
  .patch(generalController.updateOne(Supplier))
  .delete(generalController.deleteOne(Supplier));

supplierRouter
    .route("/:id/invoices")
    .get(supplierController.findSupplierInvoices())

export { supplierRouter };
