import { Delivery } from '../schemas/deliveryModel'
import { Types } from "mongoose";
import { IDeliveryDetails } from "../models/delivery-details-model";

export class DeliveryService {

    async getDeliveryBoxes(deliveryId: string): Promise<IDeliveryDetails> {
        return (Delivery.aggregate([{
            $match: {
                _id: {
                    $eq: new Types.ObjectId(deliveryId)
                }
            }
        },
            {
                $lookup: {
                    from: 'boxes',
                    localField: '_id',
                    foreignField: 'deliveryId',
                    as: 'deliveryBoxes',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'createdBy',
                                foreignField: '_id',
                                as: 'createdBy',
                                pipeline: [
                                    {
                                        $project: {
                                            _id: 1,
                                            email: 1,
                                            name: 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                          $unwind: '$createdBy'
                        },
                        {
                            $addFields: {
                                productsQuantity: { $size: "$products" }
                            }
                        },
                        {
                            $project: {
                                'products': 0,
                                'deliveryId': 0
                            }
                        }
                    ]
                }
            },
            {
                $limit: 1
            }
        ])).then(data => data[0]);
    }

}

