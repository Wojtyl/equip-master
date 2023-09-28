import { Supplier } from "../models/supplierModel";
import * as generalController from "./generalController";

export const getAllSuppliers = generalController.getAll(Supplier);
export const getSupplier = generalController.getOne(Supplier);
export const createSupplier = generalController.createOne(Supplier);
export const updateSupplier = generalController.updateOne(Supplier);
export const deleteSupplier = generalController.deleteOne(Supplier);
export const deleteAllSuppliers = generalController.deleteAll(Supplier);

export const findSupplierWithproducts = generalController.withProducts();