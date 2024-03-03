import * as generalController from "./generalController";
import { Category } from "../schemas/categoryModel";

export const createCategory= generalController.createOne(Category);
export const deleteDelivery = generalController.deleteOne(Category);
export const getDelivery = generalController.getOne(Category);
export const getAllCategories = generalController.getAll(Category);