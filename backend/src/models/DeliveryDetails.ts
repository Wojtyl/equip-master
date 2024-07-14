import { Types } from "mongoose";
import { Comment } from "./Comment";
import { User } from "./User";
import { Supplier } from "./Supplier";
import { Status } from "./Status";
import { Invoice } from "./Invoice";
import { Box } from "./Box";

export interface DeliveryDetails {
  _id: Types.ObjectId;
  boxOnDelivery: Box[];
  closed: boolean;
  comments: Comment[];
  createdBy: User;
  date: Date;
  description: string;
  invoice: Invoice;
  reopened: boolean;
  supplier: Supplier;
  status: string;
  statuses: Status[];
}