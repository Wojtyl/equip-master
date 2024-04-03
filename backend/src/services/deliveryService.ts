import { Delivery } from '../schemas/deliveryModel'
import { HydratedDocument, Types } from "mongoose";
import { IDeliveryDetails } from "../models/delivery-details-model";
import { Box } from "../schemas/boxModel";
import { RoleService } from "./RoleService";
import { URequest } from "../interfaces/user-request";
import { AppError } from "../utils/appError";
import { DeliveryStatus } from "../enums/delivery-status-enum";
import { IDeliveryWithProducts } from "../models/delivery-with-products-model";
import { ProductsQuantityMap } from "../controllers/deliveryController";
import { IProductBox } from "../interfaces/product-box";
import { InvoiceService } from "./invoiceService";

export class DeliveryService {
    private roleService: RoleService = new RoleService();
    private invoiceService: InvoiceService = new InvoiceService();

    async findDeliveryByIdOrThrow(id: string | Types.ObjectId, options?) {
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
                $lookup: {
                    from: 'invoices',
                    localField: 'invoice',
                    foreignField: '_id',
                    as: 'invoice',
                    pipeline: [
                        {$limit: 1},
                        {
                            $project: {
                                _id: 1,
                                invoiceNumber: 1,
                            }
                        }
                    ]

                },
            },

            {
                $unwind: '$invoice'
            },
            {
                $limit: 1
            }
        ])).then(data => {
            if (data[0] === undefined) throw new AppError('Delivery with that ID not found!', 404);
            return data[0];
        });
    }

    public async getDeliveryAllBoxesWithProductDetails(deliveryId: string): Promise<IDeliveryWithProducts> {
        return Delivery.aggregate([
            {
                $match: {
                    _id: {
                        $eq: new Types.ObjectId(deliveryId)
                    }
                }
            },
            {
                $lookup: {
                    from: 'boxes',
                    localField: 'boxOnDelivery',
                    foreignField: '_id',
                    as: 'boxDetails',
                    pipeline: [
                        {
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
                                            productId: this.getProductField('productId'),
                                            name: this.getProductField('name'),
                                            productIndex: this.getProductField('productIndex')
                                        }
                                    }
                                }
                            }
                        },
                        {
                            $project: {
                                "products": 1
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    "statuses": 0,
                    "boxOnDelivery": 0
                }
            }
        ]).then(data => {
            return this.returnDeliveryOrThrow(data);
        })
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

    public updateDelivery(deliveryId: string, data) {
        return Delivery.findByIdAndUpdate(deliveryId, data, {runValidators: true, new: true})
            .orFail(new AppError('Delivery not found', 404));
    }

    public compareDeliveryWithInvoice(deliveryProducts: ProductsQuantityMap, invoiceProducts: ProductsQuantityMap) {
        const differencesMap = Object.keys(invoiceProducts).reduce((acc, invoiceProduct) => {
            let differences;
            if (deliveryProducts[invoiceProduct]) {
                differences = Object.keys(invoiceProducts[invoiceProduct].quantities).reduce((differenceMap, size) => {
                    const productSize = deliveryProducts[invoiceProduct]?.quantities[size]
                    if (productSize) {
                        return {
                            ...differenceMap,
                            [size]: { quantity: deliveryProducts[invoiceProduct].quantities[size].quantity - invoiceProducts[invoiceProduct].quantities[size].quantity, isExtraSize: false }
                        }
                    }

                    else {
                        return {
                            ...differenceMap,
                            [size]: { quantity: invoiceProducts[invoiceProduct].quantities[size].quantity * -1, isExtraSize: false }
                        }
                    }

                }, {} as {[key: number]: {quantity: number, isExtraSize: boolean}})
            } else {
                differences = Object.keys(invoiceProducts[invoiceProduct].quantities).reduce((differenceMap, size) => {
                    return {
                        ...differenceMap,
                        [size]: { quantity: invoiceProducts[invoiceProduct].quantities[size].quantity * -1, isExtraSize: true }
                    }
                }, {} as {[key: number]: {quantity: number, isExtraSize: boolean}})
            }

            return {
                ...acc,
                [invoiceProduct]: {
                    ...invoiceProducts[invoiceProduct],
                    quantities: differences,
                    isExtraProduct: false
                }
            }
        }, {} as ProductsQuantityMap)


        const extraProducts = Object.keys(deliveryProducts).filter(productId => !invoiceProducts[productId])

        if (extraProducts.length > 0) {
            extraProducts.forEach(id => {
                differencesMap[id] = {
                    ...deliveryProducts[id],
                    isExtraProduct: true
                }

                differencesMap[id].quantities = Object.keys(deliveryProducts[id].quantities).reduce((differenceMap, size) => {
                    return {
                        ...differenceMap,
                        [size]: { quantity: deliveryProducts[id].quantities[size].quantity * -1, isExtraSize: true }
                    }
                }, {} as {[key: number]: {quantity: number, isExtraSize: boolean}})
            })
        }

        Object.keys(deliveryProducts).forEach(product => {
            const pro = deliveryProducts[product];
            Object.keys(pro.quantities).forEach(size => {
                const si = pro.quantities[size];
                if (!invoiceProducts[product]?.quantities[size]) {
                    differencesMap[product].quantities[size] = { quantity: si.quantity, isExtraSize: true}
                }
            })
        })

        return differencesMap;
    }

    public async changeDeliveryStatus(status: string, changedBy: string, message: string, deliveryId: string) {
        const delivery = await this.findDeliveryByIdOrThrow(deliveryId);
        return delivery.updateOne({
            $push: { statuses: { status, changedBy, message, date: new Date() } },
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

    private returnDeliveryOrThrow(data: any[]) {
        if (data[0] === undefined || data[0] === null) throw new AppError("Delivery with that ID doesn't exist", 404);
        return data[0];
    }
}

