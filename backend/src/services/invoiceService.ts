import { Invoice } from "../schemas/invoiceModel";
import { Types } from "mongoose";

export class InvoiceService {

    //NOTE: This is good method to get products with quantity and size for comparison with box delivery
    //(to check if sum of products on invoice is equal with products on delivery)
    async getInvoiceProductsWithQuantityByDelivery(invoiceId: string) {
        const data = await Invoice.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(invoiceId)
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.productId',
                    foreignField: '_id',
                    as: 'productDetails',
                }
            },
            {
                $addFields: {
                    products: {
                        $map: {
                            input: '$products',
                            as: 'product',
                            in: {
                                quantity: '$$product.quantity',
                                size: '$$product.size',
                                name: this.getProductField("name"),
                                productId: this.getProductField("_id"),
                                productIndex: this.getProductField("productIndex")
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    products: 1,
                }
            }
        ]);
        return data[0];
    }

    //TODO: Method to get all distinct products that are on invoice
    async getProductsFromInvoiceByDelivery(deliveryId: string) {

    }

    private getProductField(field) {
        return {
            $getField: {
                field,
                input: this.getProductArrayElem(field)
            }
        };
    }

    private getProductArrayElem(field) {
        return {
            $arrayElemAt: [
                {
                    $filter: {
                        input: '$productDetails',
                        as: 'productDetails',
                        cond: {
                            $eq: ['$$product.productId', '$$productDetails._id']
                        }
                    }
                },
                0
            ]
        };
    }
}