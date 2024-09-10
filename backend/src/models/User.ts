import { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  signupDate: Date;
  resetToken: string;
  phoneNumber: string;
  surname: string;
  birthday: string;
  image: string;
}