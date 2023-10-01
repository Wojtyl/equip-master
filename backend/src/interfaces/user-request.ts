import { Request } from "express";

export interface URequest extends Request {
  user: {
    id: any;
  };
}