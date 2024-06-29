import * as generalController from "./generalController";
import { Delivery } from "../schemas/deliveryModel";
import { catchAsync } from "../utils/catchAsync";
import { URequest } from "../interfaces/user-request";
import { NextFunction, Request, Response } from "express";
import { DeliveryService } from "../services/deliveryService";
import { InvoiceService } from "../services/invoiceService";
import { DeliveryComment } from "../models/delivery-comment";


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
    const productQuantities = await deliveryService.getDeiveryProductsDifferencesMap(req.params.id)

    const deliveryDetailsDTO = {
        ...data,
        invoice,
        usersList,
        productQuantities
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


export const getDeliverySummary = () => catchAsync(async (req: Request, res: Response) => {
    const summary = await deliveryService.getDeiveryProductsDifferencesMap(req.params.id);

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


export const addCommentToDelivery = () => catchAsync(async (req: URequest, res: Response) => {
    const comment: DeliveryComment = req.body;
    comment.user = req.user.id;

    const newComments = await deliveryService.addComment(req.params.id, comment);

    res.status(201).json({
        status: 'success',
        items: newComments
    })

})

export const deleteDeliveryComment = () => catchAsync(async (req: URequest, res: Response) => {
    await deliveryService.deleteComment(req.params.id, req.params.commentId);

    res.status(204).json({
        status: 'success'
    })

})

export const createDelivery = createDeliveryService();

export const getAllDeliveries = getAll();