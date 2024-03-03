import e from "express";
import * as invoiceController from "../controllers/invoiceController";
import * as authController from "../controllers/authController";
import { InvoiceController } from "../controllers/invoiceController";
const invoiceRouter = e.Router();

const invoiceControllerClass = new InvoiceController()

invoiceRouter
  .route("/")
  .get(authController.auth, invoiceControllerClass.getAllInvoices())
  .post(authController.auth, invoiceController.createInvoice)
  .delete(invoiceController.deleteAllInvoices);

invoiceRouter
  .route("/:id")
  .get(invoiceControllerClass.getInvoiceById())
  .patch(invoiceController.updateInvoice)
  .delete(invoiceController.deleteInvoice);

invoiceRouter
    .route("/:id/products")
    .get(invoiceController.getInvoiceProducts())

export { invoiceRouter };
