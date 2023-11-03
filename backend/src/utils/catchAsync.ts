import { AppError } from "./appError";
import { Request, Response, NextFunction } from "express";

function catchAsync(fn) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => next(new AppError(err.message, err.code)));
  };
}

export { catchAsync }