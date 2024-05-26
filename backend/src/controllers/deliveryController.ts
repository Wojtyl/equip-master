import * as generalController from "./generalController";
import { Delivery } from "../schemas/deliveryModel";
import { catchAsync } from "../utils/catchAsync";
import { URequest } from "../interfaces/user-request";
import { NextFunction, Request, Response } from "express";
import { DeliveryService } from "../services/deliveryService";
import { IProductBox } from "../interfaces/product-box";
import { InvoiceService } from "../services/invoiceService";

export const getDelivery = generalController.getOne(Delivery);

const deliveryService = new DeliveryService();
const invoiceService = new InvoiceService();

export const deleteDelivery = () => catchAsync(async (req: Request, res: Response) => {
    const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id);
    await deliveryService.deleteAllBoxesFromDelivery(deletedDelivery!._id.toString());

    res.status(200).json({
        status: 'success',
    })
})

const getAll = () =>
    catchAsync(async (req: URequest, res: Response) => {
        const data = await Delivery.find()
            .populate('supplier', '_id name')
            .populate('invoice', '_id invoiceNumber')
            .select('-statuses -__v');

        res.status(200).json({
            status: 'success',
            items: data
        });
    });

//TODO: Delivery should have invoice ID so that supplier invoices will be sent only those one that don't have any delivery yet
const createDeliveryService = () =>
    catchAsync(async (req: URequest, res: Response) => {
        const user = req.user;
        const status = {
            changedBy: user.id,
            status: 'NEW',
            date: new Date()
        }

        const deliveryData = new Delivery({ ...req.body, createdBy: user.id })
        deliveryData.statuses.push(status);
        const delivery = await Delivery.create(deliveryData);
        res.status(200).json({
            status: "success",
            items: delivery,
        });
    })

export const getDeliveryBoxes = () => catchAsync(async (req: URequest, res: Response, next: NextFunction) => {
    const data = await deliveryService.getDeliveryBoxes(req.params.id);
    res.status(200).json({
        status: "success",
        items: data,
    });
})

export const getDeliveryDetails = () => catchAsync(async (req: URequest, res: Response, next: NextFunction) => {
    const data = await deliveryService.getDeliveryBoxes(req.params.id);
    const invoice = await invoiceService.getInvoiceByNumber(data.invoice.invoiceNumber);
    const usersList = await deliveryService.getDeliveryUsersList(req.params.id);

    const deliveryDetailsDTO = {
        ...data,
        invoice,
        usersList
    }

    res.status(200).json({
        status: "success",
        items: deliveryDetailsDTO,
    });
})

export const updateDelivery = () => catchAsync( async (req: URequest, res: Response, next: NextFunction) => {
    const data = await deliveryService.updateDelivery(req.params.id, req.body);
    res.status(200).json({
        status: "success",
        items: data
    })
})

export const closeDelivery = () => catchAsync(async (req: URequest, res: Response) => {
    const data = await deliveryService.closeDelivery(req);
    res.status(200).json({
        status: 'success',
        items: data
    })
})

export interface ProductQuantity {
    productName: string;
    productId: string;
    productIndex: string;
    isExtraProduct: boolean;
    quantities: {
        [size: string]: {
            quantity: number,
            isExtraSize: boolean
        };
    }
}

export interface ProductsQuantityMap {
    [productId: string]: ProductQuantity;
}

function mapToProductList(productList: IProductBox[]) {
    return productList.reduce((acc, item) => {
        const selectedElement = acc[item.productId];
        const selectedElementQuantities = selectedElement?.quantities?.[item.size]?.quantity;
        return {
            ...acc,
            [item.productId]: {
                ...selectedElement,
                productName: item.name,
                productIndex: item.productIndex,
                quantities: {
                    ...selectedElement?.quantities,
                    [item.size]: { quantity: selectedElementQuantities ? item.quantity + selectedElementQuantities : item.quantity }
                }
            }
        }
    }, {} as ProductsQuantityMap)
}

interface Summary {
    productIndex: string;
    productName: string;
    id: string;
    isExtraProduct: boolean;
    sizes: {
       size: string;
       deliveryCount: number;
       differenceCount: number;
       isExtraSize: boolean;
    }[]
}

export const getDeliverySummary = () => catchAsync(async (req: Request, res: Response) => {
    const deliveryDetails = await deliveryService.getDeliveryAllBoxesWithProductDetails(req.params.id);
    const invoiceDetails = await invoiceService.getInvoiceProductsWithQuantityByDelivery(deliveryDetails.invoice)
    const productList = deliveryDetails
        .boxDetails.reduce((acc, products) => {
            return [...acc, ...products.products]
        }, [] as IProductBox[])

    const deliveryProductsMap = mapToProductList(productList);
    const invoiceProductsMap = mapToProductList(invoiceDetails.products);

    const differenceMap = deliveryService.compareDeliveryWithInvoice(deliveryProductsMap, invoiceProductsMap);

    const summary: Summary[] = Object.keys(differenceMap).map(productId => {
        const sizes = Object.keys(differenceMap[productId].quantities).map(size => {
            return {
                size,
                deliveryCount: deliveryProductsMap[productId]?.quantities[size]?.quantity ?? 0,
                differenceCount: differenceMap[productId].quantities[size].quantity,
                isExtraSize: differenceMap[productId].quantities[size].isExtraSize
            }
        })
        return {
            id: productId,
            isExtraProduct: differenceMap[productId]?.isExtraProduct ?? false,
            productIndex: differenceMap[productId].productIndex,
            productName: differenceMap[productId].productName,
            sizes
        }
    })

    res.status(200).json({
        status: 'success',
        items: summary
    })
})

export const reopenDelivery = () => catchAsync(async (req: URequest, res: Response) => {
    const data = await deliveryService.reopenDelivery(req);
    res.status(200).json({
        status: 'success',
        items: data
    })
})
export const createDelivery = createDeliveryService();

export const getAllDeliveries = getAll();