const express = require("express");
const router = express.Router();

const Supplier = require("../models/supplierModel");

const supplierController = require("../controllers/supplierController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(authController.auth, supplierController.getAllSuppliers)
  .post(authController.auth, supplierController.createSupplier)
  .delete(supplierController.deleteAllSuppliers);

router
  .route("/:id")
  .get(supplierController.getSupplier)
  .patch(supplierController.updateSupplier)
  .delete(supplierController.deleteSupplier);
module.exports = router;
