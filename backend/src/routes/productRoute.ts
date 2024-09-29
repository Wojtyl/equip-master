import e from "express";
import * as productController from "../controllers/productController";
import * as authController from "../controllers/authController";
import * as generalController from "../controllers/generalController";
import multer from "multer";
import { Error } from "mongoose";
import { ProductSize } from "../schemas/productSizeModel";
import path from 'path';

const imagesPath = path.resolve(__dirname, '../..', 'public', 'images', 'products');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesPath);
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

productRouter.route("/sizes")
    .get(authController.auth, async (req, res) => {
        const productSizes = await ProductSize.find();
        res.status(200).json({
            status: 'success',
            items: productSizes
        })
    })
    .post(authController.auth, (req, res, next) => {console.log('ahahaha'); next()} ,generalController.createOne(ProductSize))

productRouter
  .route("/:id")
  .get(authController.auth, productController.getProduct)
  .patch(authController.auth, upload.single('image'), productController.updateProduct())
  .delete(authController.auth, productController.deleteProduct);

productRouter
.route("/bySupplier/:id")
.get(authController.auth, productController.getSupplierProducts)

productRouter
    .route("/byBox/:id")
    .get(authController.auth, productController.getProductsByBox())

export { productRouter };
