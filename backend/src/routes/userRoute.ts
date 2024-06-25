import e from "express";
import * as authController from "../controllers/authController";
import multer from "multer";
import { Error } from "mongoose";
import { UserController } from "../controllers/userController";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/Users/bartek/Documents/Praca dyplomowa/equip-master/backend/public/images/profile");
  },
  filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    callback(null, Date.now().toString() + file.originalname);
  }
});

const upload = multer({ storage })

const usersRouter = e.Router();

const userController = new UserController();

usersRouter
    .route("/")
    .get(authController.auth, userController.getAllUsers())

export { usersRouter };
