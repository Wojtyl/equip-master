import { Types } from "mongoose";
import { Comment } from "./Comment";
import { Status } from "./Status";

export interface Delivery {
  _id: Types.ObjectId;
  boxOnDelivery: Types.ObjectId[];
  closed: boolean;
  comments: Comment[];
  createdBy: Types.ObjectId;
  date: Date;
  description: string;
  invoice: Types.ObjectId;
  reopened: boolean;
  supplier: Types.ObjectId;
  status: string;
  user: Types.ObjectId;
  statuses: Status[];
}