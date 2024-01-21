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
            date: new Date
        }
        const deliveryData = new Delivery({ ...req.body, createdBy: user.id })
        deliveryData.statuses.push(status);
        const delivery = await Delivery.create(deliveryData);
        res.status(200).json({
            status: "success",
            items: delivery,
        });
    })

export const getDeliveryDetails = () => catchAsync(async (req: URequest, res: Response, next: NextFunction) => {
    const data = await deliveryService.getDeliveryBoxes(req.params.id);
    res.status(200).json({
        status: "success",
        items: data,
    });

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
    isExtraProduct?: boolean;
    quantities: {
        [size: string]: number;
    }
}

export interface ProductsQuantityMap {
    [productId: string]: ProductQuantity;
}

function mapToProductList(productList: IProductBox[]) {
    return productList.reduce((acc, item) => {
        const selectedElement = acc[item.productId];
        const selectedElementQuantities = selectedElement?.quantities?.[item.size];
        return {
            ...acc,
            [item.productId]: {
                ...selectedElement,
                productName: item.name,
                productIndex: item.productIndex,
                quantities: {
                    ...selectedElement?.quantities,
                    [item.size]: selectedElementQuantities ? item.quantity + selectedElementQuantities : item.quantity
                }
            }
        }
    }, {} as ProductsQuantityMap)
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

    res.status(200).json({
        status: 'success',
        items: differenceMap
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