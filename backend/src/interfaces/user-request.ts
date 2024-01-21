import { Request } from "express";

export interface URequest extends Request {
  user: {
    //TODO: To change to ObjectID and check why f.e deliveryService status push not working
    id: any;
  };
}