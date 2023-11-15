import * as generalController from "./generalController";
import { Delivery } from "../schemas/deliveryModel";
import { catchAsync } from "../utils/catchAsync";
import { URequest } from "../interfaces/user-request";
import { Request, Response } from "express";
import { DeliveryService } from "../services/deliveryService";

export const getDelivery = generalController.getOne(Delivery);

const deliveryService = new DeliveryService();

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
  catchAsync(async (req: URequest , res: Response) => {
    const user = req.user;
    const status = {
      changedBy: user.id,
      status: 'NEW',
      date: new Date
    }
    const deliveryData = new Delivery({...req.body, createdBy: user.id})
    deliveryData.statuses.push(status);
    const delivery = await Delivery.create(deliveryData);
    res.status(200).json({
      status: "success",
      items: delivery,
    });
  })

export const getDeliveryDetails = () => catchAsync(async (req: URequest, res: Response) => {
  const data = await deliveryService.getDeliveryBoxes(req.params.id);
  res.status(200).json({
    status: "success",
    items: data,
  });
})

export const createDelivery = createDeliveryService();

export const getAllDeliveries = getAll();