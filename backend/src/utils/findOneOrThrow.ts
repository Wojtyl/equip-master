import mongoose from "mongoose"
import { AppError } from "./appError";

export const findOneOrThrow = async (model: string, id: string) => {
  const object = await mongoose.model(model).findById(id);
  if(object) {
    return object;
  } else {
    const error = new AppError(`Could not find an object with that id!`, 404);
    throw error;
  }
}