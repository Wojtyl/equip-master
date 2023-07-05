import * as generalController from "./generalController";
import { Product } from "../models/productModel";

export const createProduct = generalController.createOne(Product);
export const getProduct = generalController.getOne(Product);
export const getAllProducts = generalController.getAll(Product);
export const updateProduct = generalController.updateOne(Product);
export const deleteProduct = generalController.deleteOne(Product);
