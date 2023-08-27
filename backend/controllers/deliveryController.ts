import * as generalController from "./generalController";
import { Delivery } from "../models/deliveryModel";
import { catchAsync } from "../utils/catchAsync";

export const createDelivery = generalController.createOne(Delivery);
export const deleteDelivery = generalController.deleteOne(Delivery);
export const getDelivery = generalController.getOne(Delivery);
// export const getAllDeliveries = generalController.getAll(Delivery);


const getAll = () =>
catchAsync(async (req, res, next) => {
  const data = await Delivery.find().populate('supplier');
  res.status(200).json(data);
});

export const getAllDeliveries = getAll();