import * as generalController from "./generalController";
import { Box } from "../models/boxModel";
import { catchAsync } from "../utils/catchAsync";
import mongoose from "mongoose";
import { URequest } from "../interfaces/user-request";
import { NextFunction } from "express-serve-static-core";
import { Response } from "express";
import { findOneOrThrow } from "../utils/findOneOrThrow";

//TODO: Add ability to transfer items from one box to another. For example if user have two boxes, and want to transfer from box 1 to box 2 
//such option should be able for him

export const createBox = generalController.createOne(Box)

export const getBox = () => catchAsync(async (req: URequest,res: Response, next: NextFunction) => {
  const box: mongoose.Document = await findOneOrThrow('Box', req.params.id);
  
  res.status(200).json({
    status: 'success',
    items: box
  })
})

export const getAllBoxes = () => catchAsync(async (req: URequest,res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    items: await Box.find()
  })
})

export const deleteBox = () => catchAsync(async (req: URequest,res: Response, next: NextFunction) => {
    await Box.deleteOne({_id: req.params.id})
    res.sendStatus(200);
})