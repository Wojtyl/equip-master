import e from "express";
import * as productController from "../controllers/productController";
import * as authController from "../controllers/authController";

const productRouter = e.Router();

productRouter
  .route("/")
  .get(authController.auth, productController.getAllProducts)
  .post(authController.auth, productController.createProduct);

productRouter
  .route("/:id")
  .get(authController.auth, productController.getProduct)
  .patch(authController.auth, productController.updateProduct)
  .delete(authController.auth, productController.deleteProduct);

productRouter
.route("/bySupplier/:id")
.get(authController.auth, productController.getSupplierProducts)

export { productRouter };
