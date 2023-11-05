import * as generalController from "./generalController";
import { Invoice } from "../schemas/invoiceModel";
import { catchAsync } from "../utils/catchAsync";
import { InvoiceService } from "../services/invoiceService";

const invoiceService = new InvoiceService()
export const getAllInvoices = generalController.getAll(Invoice);
export const getInvoice = generalController.getOne(Invoice);
export const createInvoice = generalController.createOne(Invoice);
export const updateInvoice = generalController.updateOne(Invoice);
export const deleteInvoice = generalController.deleteOne(Invoice);
export const deleteAllInvoices = generalController.deleteAll(Invoice);

export const getInvoiceProducts = () => catchAsync(async (req, res) => {
    const products = await invoiceService.getInvoiceProductsWithQuantityByDelivery(req.params.id)
    res.status(200).json(products)
})