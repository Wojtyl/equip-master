const catchAsync = require("../utils/catchAsync");

const getModelName = (Model) => Model.modelName.toLowerCase();

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const user = req.user;
    const modelName = getModelName(Model);
    const newModel = await Model.create({ ...req.body, createdBy: user.id });
    res.status(200).json({
      status: "success",
      [modelName]: newModel,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = getModelName(Model);
    const data = await Model.find();
    res.status(200).json({
      status: "success",
      [modelName]: data,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = getModelName(Model);
    const data = await Model.findById(req.params.id);

    res.status(200).json({
      status: "success",
      [modelName]: data,
    });
  });

exports.updateOne = (Model) =>
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

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = getModelName(Model);
    const data = await Model.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: `${modelName} deleted successfully`,
      "data-deleted": data,
    });
  });

exports.deleteAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = getModelName(Model);
    const data = await Model.deleteMany();

    res.status(200).json({
      status: "success",
      message: `All ${modelName} collection deleted successfully`,
    });
  });
