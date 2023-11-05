import * as generalController from "./generalController";
import { Color } from "../schemas/colorModel";

export const createDelivery = generalController.createOne(Color);
export const deleteDelivery = generalController.deleteOne(Color);
export const getDelivery = generalController.getOne(Color);
export const getAllDeliveries = generalController.getAll(Color);