import * as generalController from "./generalController";
import { Product } from "../models/productModel";
import { catchAsync } from "../utils/catchAsync";

export const createProduct = generalController.createOne(Product);
export const getProduct = generalController.getOne(Product);
export const getAllProducts = generalController.getAll(Product);
export const updateProduct = generalController.updateOne(Product);
export const deleteProduct = generalController.deleteOne(Product);


const x = () => catchAsync(async (req, res, next) => {
  const user = req.user;
  console.log(user);
  const products = await Product.find({supplierId: {$eq: req.params.id}})
  res.status(200).json({
    status: "success",
    products,
  });
})

export const getSupplierProducts = x();