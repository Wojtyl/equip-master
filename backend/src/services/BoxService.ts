import { Box, IBox } from "../schemas/boxModel";
import { HydratedDocument, Types } from "mongoose";
import { Delivery } from "../schemas/deliveryModel";
import { AppError } from "../utils/appError";

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
            },
            {
              $set: {
                  statuses: {
                      $sortArray: {
                          input: '$statuses',
                          sortBy: {
                              date: -1
                          }
                      }
                  }
              }
            },
            {
                $project: {
                    productsDetails: 0
                }
            }
        ]);
        if (box.length > 0) {
            return box[0];
        } else {
            throw new AppError('Box not found', 404)
        }
    }

    public async findBoxByIdOrThrow (boxId: string) {
        return Box.findById(boxId).orFail(new AppError('Box with that ID not found', 404))
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

    public async addBoxStatus(status: string, changedBy: string, message: string, box: HydratedDocument<IBox>) {
        return box.updateOne({$push: {statuses: {status, changedBy, message, date: Date.now()}}}, {new: true, runValidators: true})
    }
}