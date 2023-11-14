import { IProduct, Product } from "../schemas/productModel";
import { Types } from "mongoose";

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
}