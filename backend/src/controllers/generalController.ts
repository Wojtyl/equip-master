import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
const getModelName = (Model) => Model.modelName.toLowerCase();

const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const user = req.user;
    const modelName = getModelName(Model);
    const newModel = await Model.create({ ...req.body, createdBy: user.id });
    res.status(201).json({
      status: "success",
      items: newModel,
    });
  });

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.find();
    res.status(200).json({
      status: "success",
      items: data
    });
  });

const getOne = (Model) =>
  catchAsync(async (req: Request, res: Response, next) => {
    const data = await Model.findById(req.params.id);
    res.status(200).json({
      status: "success",
      items: data,
    });
  });

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log("Parameters: ", req.params);
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      items: data,
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

export { deleteAll, deleteOne, updateOne, getOne, getAll, createOne };
