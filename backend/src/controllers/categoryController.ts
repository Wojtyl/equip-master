import * as generalController from "./generalController";
import { Category } from "../models/categoryModel";

export const createDelivery = generalController.createOne(Category);
export const deleteDelivery = generalController.deleteOne(Category);
export const getDelivery = generalController.getOne(Category);
export const getAllDeliveries = generalController.getAll(Category);