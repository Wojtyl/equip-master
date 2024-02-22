import * as generalController from "./generalController";
import { IProduct, Product } from "../schemas/productModel";
import { catchAsync } from "../utils/catchAsync";
import { Delivery } from "../schemas/deliveryModel";
import { Request, Response } from "express";
import { SupplierService } from "../services/SupplierService";
import { AppError } from "../utils/appError";
import { Box } from "../schemas/boxModel";
import { ImagePathGenerator } from "../utils/imagePathGenerator";

const pathGenerator = new ImagePathGenerator();

const supplierService = new SupplierService();
export const getProductsByBox = () => catchAsync(async (req: Request, res: Response) => {
    await Box.findById(req.params.id).orFail(new AppError('Box with that id does not exists', 404))
    const delivery = await Delivery
        .findOne({boxOnDelivery: { $in: req.params.id }})
        .select('supplier')
        .orFail(new AppError('No delivery connected with that box. Contact with administrator!', 404));
    const supplierId = delivery!.supplier!.toString();
    const supplierProducts = await supplierService.getSupplierProducts(supplierId);
  res.status(200).json({
    status: 'success',
    items: supplierProducts
  });
})

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

const createCustomProduct = () => catchAsync(async (req: Request, res, next) => {
  const filePath = req.file ? pathGenerator.getProductImagePath(req.file.filename) : '';

  const product = JSON.parse(req.body.product);
  const prod = await Product.create({...product, imageUrl: filePath});
  res.status(201).json({
    status: "success",
    items: prod
  });
})

export const createProduct = createCustomProduct();

export const getSupplierProducts = x();