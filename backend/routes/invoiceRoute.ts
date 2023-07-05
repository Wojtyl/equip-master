import e from "express";

const invoiceRouter = e.Router();

const invoiceController = require("../controllers/invoiceController");
const authController = require("../controllers/authController");

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
