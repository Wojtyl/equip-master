import * as generalController from "./generalController";
import { Invoice } from "../schemas/invoiceModel";
import { catchAsync } from "../utils/catchAsync";
import { InvoiceService } from "../services/invoiceService";
import { URequest } from "../interfaces/user-request";
import { Response } from "express";
import { AppError } from "../utils/appError";

const invoiceService = new InvoiceService()
// export const getAllInvoices = generalController.getAll(Invoice);
export const getInvoice = generalController.getOne(Invoice);
export const createInvoice = generalController.createOne(Invoice);
export const updateInvoice = generalController.updateOne(Invoice);
export const deleteInvoice = generalController.deleteOne(Invoice);
export const deleteAllInvoices = generalController.deleteAll(Invoice);

export class InvoiceController {

    public getInvoiceById = () => catchAsync(async (req: URequest, res: Response) => {
        const invoice = await Invoice.findById(req.params.id).populate('supplier', '_id name');

        res.status(200).json({
            status: 'success',
            items: invoice
        })
    })

    public getAllInvoices = () => catchAsync(async (req: URequest, res: Response) => {
        const invoices = await Invoice.find().populate('supplier', '_id name').orFail(() => new AppError('No invoice found',400))

        res.status(200).json({
            status: 'success',
            items: invoices
        })
    })
}

export const getInvoiceProducts = () => catchAsync(async (req, res) => {
    const products = await invoiceService.getInvoiceProductsWithQuantityByDelivery(req.params.id)
    res.status(200).json(products)
})