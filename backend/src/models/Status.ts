import { Types } from "mongoose";

export interface Status {
  changedBy: Types.ObjectId;
  status: string;
  message: string;
  date: Date;
  _id: Types.ObjectId;
}