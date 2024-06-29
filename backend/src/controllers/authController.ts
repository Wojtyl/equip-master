import { Request, Response } from "express";

const {promisify} = require("util");
import jwt, { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { User } from "../schemas/userModel";
import { EmailService } from "../services/EmailService";

const signToken = (id) =>
    jwt.sign({id: id}, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

const email = new EmailService();

const createSignToken = (user, statusCode, res) => {
  user.password = undefined;
  const token = signToken(user.id);
  const cookieOptions: any = {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
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

const login = catchAsync(async (req, res, next) => {
  const data = req.body;

  //Check if user provided login and password
  if (!data.email || !data.password) {
    return next(new AppError("Please provide a login and password", 400));
  }

  const user = await User.findOne({email: data.email});

  //Check if user exists and password is correct
  if (!user || !(await user.correctPassword!(data.password, user.password!))) {
    throw new AppError("Wrong email or password", 401);
  }

  createSignToken(user, 200, res);
});

const signup = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new AppError("Please provide email and password", 400));
  }
  const user = await User.create(req.body);
  createSignToken(user, 200, res);
});

const auth = async (req, res, next) => {
  if (!req.cookies.jwt && !req.headers.authorization) {
    return next(new AppError("You need to login first.", 401));
  }

  let token;
  if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  try {
    const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
    );

    req.user = await User.findById(decodedToken.id);

    next();
  } catch (err: any) {
    if (err.message === "jwt expired") {
      return next(
          new AppError("Your session has expired. Please log in again!", 401)
      );
    }
  }
};

const isLoggedIn = async (req, res, next) => {
  if (
      !req.cookies.jwt &&
      (!req.headers.authorization ||
          req.headers.authorization.includes(null || undefined))
  ) {
    return next(new AppError("You need to login first.", 401));
  }

  let token;
  if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user!.id,
          name: user!.name,
          email: user!.email,
          role: user!.role,
          image: user!.image,
          token,
        },
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "expired",
      message: "Your session has expired. Log in again.",
    });
  }
};

const resetPassword = catchAsync(async (req: Request, res: Response, next) => {
  try {
    const user = await User.findOne({email: {$eq: req.body.email}})
        .orFail(() => new AppError("There is no user with that email", 404));
    const token = jwt.sign({id: user._id}, process.env.JWT_RESET_PASSWORD_SECRET as string, {
      expiresIn: process.env.JWT_RESET_PASSWORD_EXPIRES_IN
    });

    await user.updateOne({resetToken: token}, {new: true});

    await email.sendMail(user, "Reset password link", token);

    res.status(200)
        .json({status: "success", email: req.body.email});
  } catch (e) {
    res.status(+(e as AppError).statusCode)
        .json({status: "error", error: (<AppError>e).message})
  }
});

const setNewPassword = catchAsync(async (req: Request, res: Response, next) => {
  // @ts-ignore
  const {password, passwordConfirm, token} = {...req.body};

  if (!token) {
    console.log(token)
    throw new AppError("You have not provided any token", 400);
  }

  let decodedToken: JwtPayload;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET as string, {}) as JwtPayload
  } catch (e) {
    throw new AppError("You provided wrong token!", 403)
  }

  const user = await User.findById(decodedToken.id).orFail(() => new AppError("There is no user with given ID", 404));

  if (user.resetToken !== token) throw new AppError("Token is not valid or has been already used", 403);

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.resetToken = null;
  await user.save();

  res.status(200).json({passwordConfirm, password, token});
})


export { isLoggedIn, auth, signup, login, resetPassword, setNewPassword };
