import e from "express";
import * as authController from "../controllers/authController";
import { ProfileController } from "../controllers/profileController";
import multer from "multer";
import { Error } from "mongoose";
import path from 'path';

const profileImagesPath = path.resolve(__dirname, '../..', 'public', 'images', 'profile');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(profileImagesPath.toString())
    cb(null, profileImagesPath);
  },
  filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    callback(null, Date.now().toString() + file.originalname);
  }
});

const upload = multer({ storage })

const profileRouter = e.Router();

const profileController = new ProfileController();

profileRouter
    .route("/")
    .get(authController.auth, profileController.getProfileDetails())
    .post(authController.auth, profileController.createProfile())
    .patch(authController.auth, profileController.updateProfile())

profileRouter.route("/image")
    .patch(authController.auth, upload.single('image'), profileController.updateProfileImage())
    .delete(authController.auth, profileController.removeProfileImage())

profileRouter
    .route("/:id")
    .get(authController.auth, profileController.getProfileDetails())
    .patch(authController.auth, profileController.updateProfile())

profileRouter.route("/changePassword")
    .patch(authController.auth, profileController.changePassword())

export { profileRouter };
