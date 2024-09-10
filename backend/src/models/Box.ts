import { Types } from "mongoose";
import { BoxProduct } from "./BoxProduct";
import { Status } from "./Status";

export interface Box {
  _id: Types.ObjectId;
  createdAt: Date;
  createdBy: Types.ObjectId;
  closed: boolean;
  deliveryId: Types.ObjectId,
  reopened: boolean;
  products: BoxProduct[];
  statuses: Status[];
  boxNumber: number;
}