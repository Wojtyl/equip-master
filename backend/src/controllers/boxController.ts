import { Box, BoxSchema } from "../schemas/boxModel";
import { catchAsync } from "../utils/catchAsync";
import { HydratedDocument } from "mongoose";
import { URequest } from "../interfaces/user-request";
import { NextFunction } from "express-serve-static-core";
import { Response } from "express";
import { BoxService } from "../services/BoxService";
import { DeliveryService } from "../services/deliveryService";
import { AppError } from "../utils/appError";
import { Product } from "../schemas/productModel";
import { BoxStatus } from "../enums/box-status-enum";
import { Delivery } from "../schemas/deliveryModel";

const boxService = new BoxService();
const deliveryService = new DeliveryService();

//TODO: Add models to responses
export class BoxController {
    createBox = () => catchAsync(async (req: URequest, res: Response) => {
        const box = await Box.create({ ...req.body, createdBy: req.user.id });
        await boxService.changeBoxStatus(BoxStatus.New, req.user.id, 'Created box', box);
        // const deliveryDetails = await deliveryService.getDeliveryBoxes(req.body.deliveryId)
        res.status(200).json({
            status: 200,
            items: box
        })
    })

    addProductToBox = () => catchAsync(async (req: URequest, res: Response) => {
        const box: HydratedDocument<BoxSchema> = await boxService.findBoxByIdOrThrow(req.params.id);
        const delivery = await deliveryService.findDeliveryByIdOrThrow(box.deliveryId);
        if (delivery.closed) throw new AppError('You can\'t add products to box when delivery is already closed', 405);
        await box.updateOne({ $push: { products: req.body } }, { new: true })
        const product = await Product.findById(req.body.productId)
            .orFail(new AppError('Product with that ID does not exists', 404));
        const updateMessage = `Added ${req.body.quantity}x ${product.name} ${req.body.size ? `in size ${req.body.size}` : ''}`
        await boxService.changeBoxStatus(BoxStatus.InProgress, req.user.id, updateMessage, box)
        const updatedBox: BoxSchema = await boxService.findBoxWithProductDetails(req.params.id)
        res.status(200).json({
            items: updatedBox,
            status: 'success'
        })
    })

    openBox = () => catchAsync(async (req: URequest, res: Response) => {
        const box = await boxService.findBoxByIdOrThrow(req.params.id);
        await boxService.changeBoxStatus(BoxStatus.InProgress, req.user.id, "Box opened", box)
        const updatedBox: BoxSchema = await boxService.findBoxWithProductDetails(req.params.id)
        res.status(200).json({
            items: updatedBox,
            status: 'success'
        })
    })

    removeProductFromBox = () => catchAsync(async (req: URequest, res: Response) => {
        const box: HydratedDocument<BoxSchema> = await boxService.findBoxByIdOrThrow(req.params.id)
        const delivery = await deliveryService.findDeliveryByIdOrThrow(box.deliveryId);
        if (delivery.closed) throw new AppError('You cannot remove items from box when delivery is already closed', 405);
        await box.updateOne({ $pull: { products: { _id: req.body.productElementId } } }, {new: true, runValidators: true});
        const statusMessage = 'Deleted from box'
        await boxService.changeBoxStatus(BoxStatus.InProgress, req.user.id, statusMessage, box);
        const updatedBox = await boxService.findBoxWithProductDetails(req.params.id);
        res.status(200).json({
            status: 'success',
            items: updatedBox
        })
    })

    getBoxWithProductDetails = () => catchAsync(async (req: URequest, res: Response, next: NextFunction) => {
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
        const box = await Box.findById(req.params.id).orFail(new AppError('Box not found', 404));
        const delivery = await Delivery.findById(box.deliveryId).orFail(new AppError('Delivery with that ID not found!', 404));
        if (delivery.closed) throw new AppError('You can\'t delete box if delivery is already closed!', 403);
        await box.deleteOne();
        await boxService.deleteBoxFromDelivery(box.deliveryId.toString(), box._id.toString());
        res.status(200).json({
            status: 'success',
            items: await deliveryService.getDeliveryBoxes(box.deliveryId.toString())
        })
    })

    closeBox = () => catchAsync(async (req: URequest, res: Response) => {
        const box: HydratedDocument<BoxSchema> = await boxService.findBoxByIdOrThrow(req.params.id);
        if (box.products.length === 0) throw new AppError('You can\'t close empty box!', 403);
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
