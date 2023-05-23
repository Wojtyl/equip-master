const Supplier = require("./../models/supplierModel");

const generalController = require("./generalController");

exports.getAllSuppliers = generalController.getAll(Supplier);
exports.getSupplier = generalController.getOne(Supplier);
exports.createSupplier = generalController.createOne(Supplier);
exports.updateSupplier = generalController.updateOne(Supplier);
exports.deleteSupplier = generalController.deleteOne(Supplier);
exports.deleteAllSuppliers = generalController.deleteAll(Supplier);
