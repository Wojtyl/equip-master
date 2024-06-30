import { Types } from "mongoose";
import { InvoiceProduct } from "./InvoiceProduct";

export interface Invoice {
  _id: Types.ObjectId;
  invoiceNumber: string;
  supplier: Types.ObjectId;
  products: InvoiceProduct[];
  date: number;
  nettoPrice: number;
  currency: string;
}