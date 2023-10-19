import { AppError } from "../utils/appError";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 404);
};
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  const message = `Duplicate field value: ${value[0]}`;
  return new AppError(message, 404);
};
const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 404);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);
const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please log in again", 401);

const sendErrorDev = (err, req, res) => {

  if (err.statusCode === 11000) err.statusCode = 409;

  if (req.originalUrl.startsWith("/api")) {
    if (err.message.includes("duplicate key")) {
      err.message = "Key duplication! Please use different value";
    }
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    console.error("ERROR ❤️", err);
    res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //1 log error
    console.error("ERROR ❤️", err);
    //2 send generig message

    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
  //Rendered website
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
  //1 log error
  console.error("ERROR ❤️", err);
  //2 send generig message
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later!",
  });
};

export const errorController = (err, req, res, next) => {
  // console.log(err.stack);
  //Standardowe ustawienia dla większości aplikacji
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);
    // error.message = err.message;

    if (error.name === "CastError") error = handleCastErrorDB(error);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    if (error.name === "JsonWebTokenError") error = handleJWTError();

    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
