import e from "express";
import * as invoiceController from "../controllers/invoiceController";
import * as authController from "../controllers/authController";
const invoiceRouter = e.Router();

invoiceRouter
  .route("/")
  .get(authController.auth, invoiceController.getAllInvoices)
  .post(authController.auth, invoiceController.createInvoice)
  .delete(invoiceController.deleteAllInvoices);

invoiceRouter
  .route("/:id")
  .get(invoiceController.getInvoice)
  .patch(invoiceController.updateInvoice)
  .delete(invoiceController.deleteInvoice);

export { invoiceRouter };
