import * as generalController from "./generalController";
import { Delivery } from "../models/deliveryModel";
import { catchAsync } from "../utils/catchAsync";
import { URequest } from "../interfaces/user-request";
import { Response } from "express";

export const deleteDelivery = generalController.deleteOne(Delivery);
export const getDelivery = generalController.getOne(Delivery);
// export const getAllDeliveries = generalController.getAll(Delivery);


const getAll = () =>
catchAsync(async (req: URequest, res: Response, next) => {
const query = { 'supplier.address': { $exists: false } };
  const data = await Delivery.find(query).populate('supplier', '_id name').select('-boxOnDelivery -statuses -__v');
  res.status(200).json({
    status: 'success',
    items: data
  });
});

const createDeliveryService = () => 
  catchAsync(async (req: URequest , res: Response, next) => {
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

export const getDeliveryDetails = () => catchAsync(async (req: URequest, res: Response, next) => {
  const data = await Delivery.findById(req.params.id);

  res.status(200).json({
    status: "success",
    items: data,
  });
})

export const createDelivery = createDeliveryService();

export const getAllDeliveries = getAll();