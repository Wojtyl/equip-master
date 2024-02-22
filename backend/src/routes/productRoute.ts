import e from "express";
import * as productController from "../controllers/productController";
import * as authController from "../controllers/authController";
import multer from "multer";
import { Error } from "mongoose";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/Users/bartek/Documents/Praca dyplomowa/equip-master/backend/public/images/products");
    },
    filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        console.log(file)
        callback(null, Date.now().toString() + file.originalname);
    }
});
const upload = multer({ storage })

const productRouter = e.Router();

productRouter
  .route("/")
  .get(authController.auth, productController.getAllProducts)
  .post(authController.auth, upload.single('image'), productController.createProduct);

productRouter
  .route("/:id")
  .get(authController.auth, productController.getProduct)
  .patch(authController.auth, productController.updateProduct)
  .delete(authController.auth, productController.deleteProduct);

productRouter
.route("/bySupplier/:id")
.get(authController.auth, productController.getSupplierProducts)

productRouter
    .route("/byBox/:id")
    .get(authController.auth, productController.getProductsByBox())

export { productRouter };
