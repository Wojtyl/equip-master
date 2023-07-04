const express = require("express");
const invoiceRouter = express.Router();

const Invoice = require("../models/invoiceModel");

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
module.exports = invoiceRouter;

export { invoiceRouter }
