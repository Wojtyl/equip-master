import { IProduct, Product } from "../schemas/productModel";
import { Types } from "mongoose";
import { Supplier } from "../schemas/supplierModel";
import { AppError } from "../utils/appError";
import { ISupplier } from "../models/supplier-model";

export class SupplierService {
    public async getSupplierProducts(supplierId: string) {
        return Product.aggregate<IProduct>([
            {
                $match: {
                    supplierId: new Types.ObjectId(supplierId)
                }
            }
        ])
    }

    public async getSupplierById(supplierId: string) {
        return Supplier.findById(supplierId).orFail(new AppError('Supplier not found', 404));
    }

    public async getSupplierByVatId(vatId: string) {
        return Supplier.find<ISupplier>({taxIdNum: { $eq: vatId}});
    }
}