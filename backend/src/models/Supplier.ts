import { Types } from "mongoose";

export interface Supplier {
  _id: Types.ObjectId;
  name: string;
  taxIdNum: number;
  description: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  }
  active: boolean;
  addedAt: Date;
  createdBy: Types.ObjectId;
  productColors: string[];
  email: string;
  phoneNumber: string;
  contact: string;
  website: string;
}