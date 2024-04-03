import { Box, BoxSchema } from "../schemas/boxModel";
import { HydratedDocument, Schema, Types } from "mongoose";
import { Delivery } from "../schemas/deliveryModel";
import { AppError } from "../utils/appError";
import { BoxStatus } from "../enums/box-status-enum";

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
              $lookup: {
                  from: 'users',
                  localField: 'createdBy',
                  foreignField: '_id',
                  as: 'createdBy',
                  pipeline: [
                      {
                          $project: {
                              'name': 1,
                              '_id': 1
                          }
                      }
                  ]
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
              $unwind: '$createdBy'
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

    public async findBoxByIdOrThrow (boxId: string | Types.ObjectId) {
        return Box.findById(boxId).orFail(new AppError('Box with that ID not found', 404));
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

    public async changeBoxStatus(status: string, changedBy: string, message: string, box: HydratedDocument<BoxSchema>) {
        //TODO: To check if reopened and closed status should be updated in this service
        if (status === BoxStatus.InProgress && (box.reopened || box.closed)) {
            if (!box.reopened) await box.updateOne({reopened: true});
            if (box.closed) await box.updateOne({closed: false});
            status = BoxStatus.Reopened
        }
        return box.updateOne({$push: {statuses: {status, changedBy, message, date: new Date()}}}, {new: true, runValidators: true})
    }
}