const express = require("express");
const router = express.Router();

const Invoice = require("../models/invoiceModel");

const invoiceController = require("../controllers/invoiceController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(authController.auth, invoiceController.getAllInvoices)
  .post(authController.auth, invoiceController.createInvoice)
  .delete(invoiceController.deleteAllInvoices);

router
  .route("/:id")
  .get(invoiceController.getInvoice)
  .patch(invoiceController.updateInvoice)
  .delete(invoiceController.deleteInvoice);
module.exports = router;
