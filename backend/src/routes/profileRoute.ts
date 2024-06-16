import e from "express";
import * as authController from "../controllers/authController";
import { ProfileController } from "../controllers/profileController";
import multer from "multer";
import { Error } from "mongoose";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/Users/bartek/Documents/Praca dyplomowa/equip-master/backend/public/images/profile");
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
    .patch(authController.auth, profileController.updateProfile())

profileRouter.route("/image")
    .patch(authController.auth, upload.single('image'), profileController.updateProfileImage())
    .delete(authController.auth, profileController.removeProfileImage())

export { profileRouter };
