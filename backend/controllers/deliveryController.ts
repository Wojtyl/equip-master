import * as generalController from "./generalController";
import { Delivery } from "../models/deliveryModel";

export const createDelivery = generalController.createOne(Delivery);
export const getDelivery = generalController.getOne(Delivery);
export const getAllDeliveries = generalController.getAll(Delivery);
