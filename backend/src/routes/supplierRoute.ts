import e from "express";
import * as supplierController from "../controllers/supplierController";
import * as authController from "../controllers/authController";
import * as generalController from "../controllers/generalController";
import { Supplier } from "../schemas/supplierModel";

const supplierRouter = e.Router();

supplierRouter
  .route("/")
    .all(authController.auth)
    .get(supplierController.findSupplierWithProducts())
    .post(generalController.getOne(Supplier))
    .delete(generalController.deleteAll(Supplier));

supplierRouter
  .route("/:id")
    .all(authController.auth)
    .get(generalController.getOne(Supplier))
    .patch(generalController.updateOne(Supplier))
    .delete(generalController.deleteOne(Supplier));

supplierRouter
    .route("/:id/invoices")
      .get(supplierController.findSupplierInvoices())

export { supplierRouter };
