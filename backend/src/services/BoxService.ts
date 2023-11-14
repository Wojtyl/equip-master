import { Box } from "../schemas/boxModel";
import { Types } from "mongoose";
import { Delivery } from "../schemas/deliveryModel";

export class BoxService {
    constructor() {
    }

    public async findBoxWithProductDetails(boxId: string) {
        const box = await Box.aggregate([
            {
                $match: {
                    _id: {
                        $eq: new Types.ObjectId(boxId)
                    }
                }
            }, {
                $lookup: {
                    from: 'products',
                    localField: 'products.productId',
                    foreignField: '_id',
                    as: 'productsDetails',
                    pipeline: [{
                        $addFields: {
                            productId: '$_id'
                        }
                    }, {
                        $project: {
                            _id: 0,
                            productId: 1,
                            name: 1,
                            productIndex: 1
                        }
                    }]
                }
            },
            {
                $addFields: {
                    products: {
                        $map: {
                            input: '$products',
                            as: 'prod',
                            in: {
                                quantity: '$$prod.quantity',
                                size: '$$prod.size',
                                _id: '$$prod._id',
                                productId: this.getProductField('productId'),
                                name: this.getProductField('name'),
                                productIndex: this.getProductField('productIndex')
                            }
                        }
                    }
                }
            }, {
                $project: {
                    productsDetails: 0
                }
            }
        ]);
        return box[0];
    }

    public findBoxWithProductQuantity() {

    }

    public async deleteBoxFromDelivery(deliveryId: string, boxId: string) {
        return Delivery.updateOne({_id: deliveryId}, {$pull: {boxOnDelivery: new Types.ObjectId(boxId)}})
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
                        input: '$productsDetails',
                        as: 'productsDetails',
                        cond: {
                            $eq: ['$$prod.productId', '$$productsDetails.productId']
                        }
                    }
                },
                0
            ]
        };
    }
}