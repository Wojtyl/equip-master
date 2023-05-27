const generalController = require("./generalController");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSignToken = (user, statusCode, res) => {
  user.password = undefined;
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const data = req.body;

  //Check if user provided login and password
  if (!data.email || !data.password) {
    return next(new AppError("Please provide a login and password", 400));
  }

  const user = await User.findOne({ email: data.email });

  //Check if user exists and password is correct
  if (!user || !(await user.correctPassword(data.password, user.password))) {
    throw new AppError("Wrong email or password", 400);
  }

  createSignToken(user, 200, res);
});

exports.signup = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new AppError("Please provide email and password"));
  }
  const user = await User.create(req.body);
  createSignToken(user, 200, res);
});

exports.auth = async (req, res, next) => {
  if (!req.cookies.jwt) {
    return next(new AppError("Login first", 403));
  }
  const token = req.cookies.jwt;
  try {
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    req.user = await User.findById(decodedToken.id);

    next();
  } catch (err) {
    if (err.message === "jwt expired") {
      return next(
        new AppError("Your session has expired. Please log in again!", 401)
      );
    }
  }
};
