import e from "express";
import { ValidationController } from "../controllers/validationController";
const validationRouter = e.Router();
const validationController = new ValidationController();

validationRouter
    .route("/invoiceNumberUnique")
    .post(validationController.validateUniqueInvoiceNumber())


export { validationRouter };
