import { Types } from "mongoose";

export interface BoxProduct {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  addedBy: Types.ObjectId;
  quantity: number;
  size: string;
}