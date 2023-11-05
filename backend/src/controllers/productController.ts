import * as generalController from "./generalController";
import { IProduct, Product } from "../schemas/productModel";
import { catchAsync } from "../utils/catchAsync";

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

const createCustomProduct = () => catchAsync(async (req, res, next) => {
  let products = [];
  const data = {...req.body as IProduct};

  if (req.body.attributes?.colour?.length > 1) {
    for (const colour of req.body.attributes.colour) {
      data.name += ' ' + colour;
      data.productIndex += ' ' + colour
      data.attributes.colour = colour;
      const newProduct = new Product({...data, createdBy: req.user.id})
      // @ts-ignore
      products.push(newProduct);
    }
  } else {
    if (data.attributes.colour) {
      data.attributes.colour = data.attributes?.colour[0];
    }
    // @ts-ignore
    products.push(new Product({...req.body, createdBy: req.user.id}))
  }
  await Product.create(...products)
  res.status(201).json({
    status: "success",
    products,
  });
})

export const createProduct = createCustomProduct();

export const getSupplierProducts = x();