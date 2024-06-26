import { Supplier } from "../schemas/supplierModel";
import { Invoice } from "../schemas/invoiceModel";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { SupplierService } from "../services/SupplierService";

const supplierService = new SupplierService()

export const findSupplierProducts = () => catchAsync(async (req: Request, res: Response) => {
    const products = await supplierService.getSupplierProducts(req.params.id);

    res.status(200).json({
        status: 'success',
        products
    })

})
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
        items: supplier});
})

/*TODO: Right now GET invoices by supplier id is in supplier controller and always returning invoices without any delivery
*  Needed change: Move method to invoice controller and add param to determine if send back all invoices or only without delivery*/
export const findSupplierInvoicesWithoutDelivery = () => catchAsync(async (req: Request, res: Response) => {
    const invoices = await Invoice.aggregate([
        {
          $match: {
              supplier: {
                  $eq: new Types.ObjectId(req.params.id)
              }
          }
        },
        {
            $lookup: {
                from: 'deliveries',
                localField: '_id',
                foreignField: 'invoice',
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
        items: invoices
    })
})