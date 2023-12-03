import { Delivery } from '../schemas/deliveryModel'
import { HydratedDocument, Types } from "mongoose";
import { IDeliveryDetails } from "../models/delivery-details-model";
import { Box, IBox } from "../schemas/boxModel";
import { RoleService } from "./RoleService";
import { URequest } from "../interfaces/user-request";
import { AppError } from "../utils/appError";
import { DeliveryStatus } from "../enums/delivery-status-enum";

export class DeliveryService {
    private roleService: RoleService = new RoleService();

    async findDeliveryByIdOrThrow(id: string | Types.ObjectId) {
        return Delivery.findById(id).orFail(new AppError('Delivery with that ID not found!', 404));
    }

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
        ])).then(data => {
            if (data[0] === undefined) throw new AppError('Delivery with that ID not found!', 404);
            return data[0];
        });
    }

    public async changeDeliveryStatus(status: string, changedBy: string, message: string, deliveryId: string) {
        const delivery = await this.findDeliveryByIdOrThrow(deliveryId);
        return delivery.updateOne({
            $push: { statuses: { status, changedBy, message, date: Date.now() } },
            status
        }, { new: true, runValidators: true });
    }

    public async deleteAllBoxesFromDelivery(deliveryId: string) {
        return Box.deleteMany({ deliveryId: deliveryId });
    }

    public async closeDelivery(req: URequest) {
        if (!await this.roleService.isAdmin(req.user.id)) throw new AppError('You are not authenticated to do that', 403);

        const delivery = await this.getDeliveryBoxes(req.params.id);
        if (delivery.deliveryBoxes.length === 0 || !delivery.deliveryBoxes.every(box => box.closed)) {
            throw new AppError('You can\'t close delivery if you don\'t have any box or not every box is closed!', 401);
        }
        if (delivery.closed) throw new AppError('Delivery is already closed.', 405);
        await this.changeDeliveryStatus(DeliveryStatus.Finished, req.user.id, 'Delivery finished', req.params.id);

        return Delivery.findByIdAndUpdate(req.params.id, { closed: true }, { new: true });
    }

    public async reopenDelivery(req: URequest) {
        if (!await this.roleService.isAdmin(req.user.id)) throw new AppError('You are not authenticated to do that', 403);
        const delivery = await this.findDeliveryByIdOrThrow(req.params.id);
        if (!delivery.closed) throw new AppError('You can\'t reopen delivery which is not closed.', 405);
        await this.changeDeliveryStatus(DeliveryStatus.Reopened, req.user.id, 'Delivery reopened', req.params.id);

        return Delivery.findByIdAndUpdate<HydratedDocument<IDeliveryDetails>>(req.params.id, {
            closed: false,
            reopened: true
        }, { new: true });
    }
}

