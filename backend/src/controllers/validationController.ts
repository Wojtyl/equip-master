import { catchAsync } from "../utils/catchAsync";
import { URequest } from "../interfaces/user-request";
import { Response } from "express";
import { Invoice } from "../schemas/invoiceModel";
import { InvoiceService } from "../services/invoiceService";

export class ValidationController {
    constructor() {
    }

    private invoiceService = new InvoiceService();

    public validateUniqueInvoiceNumber = () => catchAsync(async (req: URequest, res: Response) => {
        console.log(req.body.invoiceNumber)
        const invoice  = await this.invoiceService.getInvoiceByNumber(req.body.invoiceNumber);
        const unique = !(invoice?.length > 0);
        // const invoice = await Invoice.findById(req.params.id).populate('supplier', '_id name');

        res.status(200).json({
            unique
        })
    })
}