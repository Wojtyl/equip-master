import * as generalController from "./generalController";
import { Delivery } from "../models/deliveryModel";
import { catchAsync } from "../utils/catchAsync";

export const deleteDelivery = generalController.deleteOne(Delivery);
export const getDelivery = generalController.getOne(Delivery);
// export const getAllDeliveries = generalController.getAll(Delivery);


const getAll = () =>
catchAsync(async (req, res, next) => {
  const data = await Delivery.find().populate('supplier');
  res.status(200).json(data);
});

const createDeliveryService = () => 
  catchAsync(async (req, res, next) => {
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
      delivery,
    });
  })


export const createDelivery = createDeliveryService();

export const getAllDeliveries = getAll();