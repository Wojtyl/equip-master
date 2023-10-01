import * as generalController from "./generalController";
import { Box } from "../models/boxModel";
import { catchAsync } from "../utils/catchAsync";
import mongoose from "mongoose";

//TODO: Add ability to transfer items from one box to another. For example if user have two boxes, and want to transfer from box 1 to box 2 
//such option should be able for him

export const createBox = generalController.createOne(Box)

export const getBox = () => catchAsync(async (req,res,next) => {
  res.status(200).json({
    status: 'success',
    items: await Box.findById(req.params.id)
  })
})