import {Supplier} from "../models/supplierModel";
import {Invoice} from "../models/invoiceModel";
import {catchAsync} from "../utils/catchAsync";
import {NextFunction, Request, Response} from "express";

export const findSupplierWithProducts = () => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const supplier = await Supplier.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'supplierId',
                as: 'products'
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        supplier: supplier});
})
export const findSupplierInvoices = () => catchAsync(async (req: Request, res: Response) => {
    const invoices = await Invoice.find({supplierId: {$eq: req.params.id}})
    res.status(200).json({
        status: 'success',
        invoices
    })
})