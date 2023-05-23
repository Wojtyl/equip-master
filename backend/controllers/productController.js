const Product = require("./../models/productModel");
const generalController = require("./generalController");

exports.createProduct = generalController.createOne(Product);
exports.getProduct = generalController.getOne(Product);
exports.getAllProducts = generalController.getAll(Product);
exports.updateProduct = generalController.updateOne(Product);
exports.deleteProduct = generalController.deleteOne(Product);
