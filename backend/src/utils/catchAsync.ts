import { AppError } from "./appError";

function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(new AppError(err.message, err.code)));
  };
};

export { catchAsync }