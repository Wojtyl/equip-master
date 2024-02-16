import { catchAsync } from "../utils/catchAsync";
import { URequest } from "../interfaces/user-request";
import { Response } from "express";
import { InvoiceService } from "../services/invoiceService";
import { Supplier } from "../schemas/supplierModel";
import { ISupplier } from "../models/supplier-model";

export class ValidationController {
    constructor() {
    }

    private invoiceService = new InvoiceService();

    public validateUniqueInvoiceNumber = () => catchAsync(async (req: URequest, res: Response) => {
        console.log(req.body.invoiceNumber)
        const invoice  = await this.invoiceService.getInvoiceByNumber(req.body.invoiceNumber);
        const unique = !(invoice?.length > 0);

        res.status(200).json({
            unique
        })
    })

    public validateUniqueSupplierVatId = () => catchAsync(async (req: URequest, res: Response) =>  {
        const supplier = await Supplier.find<ISupplier>({taxIdNum: { $eq: req.body.supplierVatId }});
        res.status(200).json({
            unique: !(supplier.length > 0)
        })
    })
}