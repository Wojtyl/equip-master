import { Supplier } from "../models/supplierModel";
import { Invoice } from "../models/invoiceModel";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";
import { Types } from "mongoose";

export const findSupplierWithProducts = () => catchAsync(async (_: Request, res: Response) => {
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
    const invoices = await Invoice.aggregate([
        {
          $match: {
              supplierId: {
                  $eq: new Types.ObjectId(req.params.id)
              }
          }
        },
        {
            $lookup: {
                from: 'deliveries',
                localField: '_id',
                foreignField: 'invoiceId',
                as: "deliveries"
            }
        },
        {
            $match: {
                deliveries: {
                    $size: 0
                }
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        invoices
    })
})