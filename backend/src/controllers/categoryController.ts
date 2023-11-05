import * as generalController from "./generalController";
import { Category } from "../schemas/categoryModel";

export const createDelivery = generalController.createOne(Category);
export const deleteDelivery = generalController.deleteOne(Category);
export const getDelivery = generalController.getOne(Category);
export const getAllDeliveries = generalController.getAll(Category);