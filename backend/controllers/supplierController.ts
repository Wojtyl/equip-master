const Supplier = require("./../models/supplierModel");

// const generalController = require("./generalController");

import * as generalController from "./generalController" 

// class supplierController {
  
//   getAllSuppliers = _ => generalController.getAll(Supplier);
//   getSupplier = _ => generalController.getOne(Supplier);
//   createSupplier = _ => generalController.createOne(Supplier);
//   updateSupplier = _ => generalController.updateOne(Supplier);
//   deleteSupplier = _ => generalController.deleteOne(Supplier);
//   deleteAllSuppliers = _ => generalController.deleteAll(Supplier);
  
// }

// export { supplierController }
// exports.getAllSuppliers = generalController.getAll(Supplier);
// exports.getSupplier = generalController.getOne(Supplier);
// exports.createSupplier = generalController.createOne(Supplier);
// exports.updateSupplier = generalController.updateOne(Supplier);
// exports.deleteSupplier = generalController.deleteOne(Supplier);
// exports.deleteAllSuppliers = generalController.deleteAll(Supplier);

const getAllSuppliers = generalController.getAll(Supplier);
const getSupplier = generalController.getOne(Supplier);
const createSupplier = generalController.createOne(Supplier);
const updateSupplier = generalController.updateOne(Supplier);
const deleteSupplier = generalController.deleteOne(Supplier);
const deleteAllSuppliers = generalController.deleteAll(Supplier);

export { getAllSuppliers, getSupplier, createSupplier, updateSupplier, deleteAllSuppliers, deleteSupplier }