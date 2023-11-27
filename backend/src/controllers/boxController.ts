import { Box, IBox } from "../schemas/boxModel";
import { catchAsync } from "../utils/catchAsync";
import { HydratedDocument, Types } from "mongoose";
import { URequest } from "../interfaces/user-request";
import { NextFunction } from "express-serve-static-core";
import { Request, Response } from "express";
import { BoxService } from "../services/BoxService";
import { DeliveryService } from "../services/deliveryService";
import { AppError } from "../utils/appError";
import { Product } from "../schemas/productModel";
import { BoxStatus } from "../enums/box-status-enum";

const boxService = new BoxService();
const deliveryService = new DeliveryService();

//TODO: Add models to responses
export class BoxController {
    createBox = () => catchAsync(async (req: URequest, res: Response) => {
        const box = await Box.create({ ...req.body, createdBy: req.user.id });
        await boxService.changeBoxStatus(BoxStatus.New, req.user.id, 'Created box', box);
        const deliveryDetails = await deliveryService.getDeliveryBoxes(req.body.deliveryId)
        res.status(200).json({
            status: 200,
            items: deliveryDetails
        })
    })

    addProductToBox = () => catchAsync(async (req: URequest, res: Response) => {
        const box: HydratedDocument<IBox> = await Box
            .findOneAndUpdate({ _id: { $eq: new Types.ObjectId(req.params.id) } }, { $push: { products: req.body } }, { new: true })
            .orFail(new AppError('Box not found', 404));
        const product = await Product.findById(req.body.productId)
            .orFail(new AppError('Product with that ID does not exists', 404));
        const updateMessage = `Added ${req.body.quantity}x ${product.name} ${req.body.size ? `in size ${req.body.size}` : ''}`
        await boxService.changeBoxStatus(BoxStatus.InProgress, req.user.id, updateMessage, box)
        const updatedBox: IBox = await boxService.findBoxWithProductDetails(req.params.id)
        res.status(200).json({
            items: updatedBox,
            status: 'success'
        })
    })

    removeProductFromBox = () => catchAsync(async (req: URequest, res: Response) => {
        const box: HydratedDocument<IBox> = await Box
            .findByIdAndUpdate(req.params.id, { $pull: { products: { _id: req.body.productElementId } } }, {new: true, runValidators: true})
            .orFail(new AppError('Box not found', 404));
        const statusMessage = 'Deleted from box'
        await boxService.changeBoxStatus(BoxStatus.InProgress, req.user.id, statusMessage, box);
        const updatedBox = await boxService.findBoxWithProductDetails(req.params.id);
        res.status(200).json({
            status: 'success',
            items: updatedBox
        })
    })

    getBox = () => catchAsync(async (req: URequest, res: Response, next: NextFunction) => {
        const box = await boxService.findBoxWithProductDetails(req.params.id);
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
        const deletedBox = await Box.findByIdAndDelete({ _id: req.params.id })
            .orFail(new AppError('Box not found', 404));
        await boxService.deleteBoxFromDelivery(deletedBox.deliveryId.toString(), deletedBox._id.toString());
        res.status(200).json({
            status: 'success',
            items: await deliveryService.getDeliveryBoxes(deletedBox.deliveryId.toString())
        })
    })

    closeBox = () => catchAsync(async (req: URequest, res: Response) => {
        const box: HydratedDocument<IBox> = await boxService.findBoxByIdOrThrow(req.params.id);
        await box.updateOne({closed: true});
        await boxService.changeBoxStatus(BoxStatus.Closed, req.user.id, 'Box closed', box);
        res.status(200).json(
            {
                status: 'success',
                items: await boxService.findBoxWithProductDetails(req.params.id)
            }
        )
    })
}

//TODO: Add ability to transfer items from one box to another. For example if user have two boxes, and want to transfer from box 1 to box 2 
