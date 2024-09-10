import { Types } from "mongoose";

export interface InvoiceProduct {
  productId: Types.ObjectId;
  quantity: number;
  size: string;
  price: number;
}