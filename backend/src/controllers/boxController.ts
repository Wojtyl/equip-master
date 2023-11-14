import { Box } from "../schemas/boxModel";
import { catchAsync } from "../utils/catchAsync";
import { Types } from "mongoose";
import { URequest } from "../interfaces/user-request";
import { NextFunction } from "express-serve-static-core";
import { Request, Response } from "express";
import { BoxService } from "../services/BoxService";
import { DeliveryService } from "../services/deliveryService";
import { AppError } from "../utils/appError";

const boxService = new BoxService();
const deliveryService = new DeliveryService();

//TODO: Add models to responses
export class BoxController {
    createBox = () => catchAsync(async (req: URequest, res: Response) => {
        await Box.create({ ...req.body, createdBy: req.user.id });
        const deliveryDetails = await deliveryService.getDeliveryBoxes(req.body.deliveryId)

        res.status(200).json({
            status: 200,
            items: deliveryDetails
        })
    })
    addProductToBox = () => catchAsync(async (req: Request, res: Response) => {
        await Box.updateOne({ _id: { $eq: new Types.ObjectId(req.params.id) } }, { $push: { products: req.body } });
        const updatedBox = await boxService.findBoxWithProductDetails(req.params.id)
        res.status(200).json({
            items: updatedBox,
            status: 'success'
        })
    })

    removeProductFromBox = () => catchAsync(async (req: Request, res: Response) => {
        console.log(req.body, req.params)
        await Box.updateOne({ _id: req.params.id }, { $pull: { products: { _id: req.body.productElementId } } })
        const updatedBox = await boxService.findBoxWithProductDetails(req.params.id);
        res.status(200).json({
            status: 'success',
            items: updatedBox
        })
    })

    getBox = () => catchAsync(async (req: URequest, res: Response, next: NextFunction) => {
        const box = await boxService.findBoxWithProductDetails(req.params.id)

        res.status(200).json({
            status: 'success',
            items: box
        })
    })

    getAllBoxes = () => catchAsync(async (req: URequest, res: Response, next: NextFunction) => {
        res.status(200).json({
            status: 'success',
            items: await Box.find()
        })
    })

    deleteBox = () => catchAsync(async (req: URequest, res: Response, next: NextFunction) => {
        const deletedBox = await Box.findByIdAndDelete({ _id: req.params.id });

        if (deletedBox) {
        await boxService.deleteBoxFromDelivery(deletedBox.deliveryId.toString(), deletedBox._id.toString());
            res.status(200).json({
                status: 'success',
                items: await deliveryService.getDeliveryBoxes(deletedBox.deliveryId.toString())
            })
        } else {
            next(new AppError('Box not found', 404))
        }
    })
}

//TODO: Add ability to transfer items from one box to another. For example if user have two boxes, and want to transfer from box 1 to box 2 
