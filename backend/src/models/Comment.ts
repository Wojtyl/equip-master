import { Types } from "mongoose";

export interface Comment {
  user: Types.ObjectId;
  date: Date;
  comment: string;
  _id: Types.ObjectId;
}