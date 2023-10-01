import { RequestHandler, Request, Response } from "express";
import { Supplier } from "../models/supplierModel";
import { catchAsync } from "../utils/catchAsync";
const getModelName = (Model) => Model.modelName.toLowerCase();

const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const user = req.user;
    console.log(user);
    const modelName = getModelName(Model);
    const newModel = await Model.create({ ...req.body, createdBy: user.id });
    res.status(201).json({
      status: "success",
      [modelName]: newModel,
    });
  });

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = getModelName(Model);
    const data = await Model.find();
    res.status(200).json({
      status: "success",
      [modelName]: data
    });
  });

const getOne = (Model) =>
  catchAsync(async (req: Request, res: Response, next) => {
    const modelName = getModelName(Model);
    const data = await Model.findById(req.params.id);
    res.status(200).json({
      status: "success",
      [modelName]: data,
    });
  });

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log("Parameters: ", req.params);
    const modelName = getModelName(Model);
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      [modelName]: data,
    });
  });

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = getModelName(Model);
    const data = await Model.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: `${modelName} deleted successfully`,
      "data-deleted": data,
    });
  });

const deleteAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = getModelName(Model);
    const data = await Model.deleteMany();

    res.status(200).json({
      status: "success",
      message: `All ${modelName} collection deleted successfully`,
    });
  });

const withProducts = () => catchAsync(async (req, res, next) => {
    const supplier = await Supplier.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'supplierId',
          as: 'products'
        }
      }
    ]);
  
    res.status(200).json({
      status: 'success',
      supplier: supplier});
})

export { deleteAll, deleteOne, updateOne, getOne, getAll, createOne, withProducts };
