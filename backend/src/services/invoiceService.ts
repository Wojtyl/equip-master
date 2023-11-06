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
                    as: 'productDetails'
                }
            },
            {
                $addFields: {
                    products: {
                        $map: {
                            input: '$products',
                            as: 'productDetails',
                            in: {
                                quantity: '$$product.quantity',
                                size: '$$product.size',
                                product: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: '$productDetails',
                                                as: 'detail',
                                                cond: {
                                                    $eq: ['$$product.productId', '$$detail._id']
                                                }
                                            }
                                        },
                                        0
                                    ]
                                }
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
}