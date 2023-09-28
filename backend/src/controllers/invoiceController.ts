import * as generalController from "./generalController";
import { Invoice } from "../models/invoiceModel";

export const getAllInvoices = generalController.getAll(Invoice);
export const getInvoice = generalController.getOne(Invoice);
export const createInvoice = generalController.createOne(Invoice);
export const updateInvoice = generalController.updateOne(Invoice);
export const deleteInvoice = generalController.deleteOne(Invoice);
export const deleteAllInvoices = generalController.deleteAll(Invoice);
