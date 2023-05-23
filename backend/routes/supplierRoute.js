const express = require("express");
const router = express.Router();

const Supplier = require("../models/supplierModel");

const supplierController = require("../controllers/supplierController");

router
  .route("/")
  .get(supplierController.getAllSuppliers)
  .post(supplierController.createSupplier)
  .delete(supplierController.deleteAllSuppliers);

router
  .route("/:id")
  .get(supplierController.getSupplier)
  .patch(supplierController.updateSupplier)
  .delete(supplierController.deleteSupplier);
module.exports = router;
