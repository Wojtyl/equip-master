import { catchAsync } from "../utils/catchAsync";
import { URequest } from "../interfaces/user-request";
import { Response } from "express";
import { ProfileService } from "../services/ProfileService";
import { Types } from "mongoose";
import { ProfileDTO } from "../models/profile-model";
import { ImagePathGenerator } from "../utils/imagePathGenerator";
import { UserService } from "../services/UserService";
import * as fs from "node:fs";
import path from "node:path";
import { AppError } from "../utils/appError";
import { ResetPasswordForm } from "../models/reset-password-form";
import bcrypt from 'bcryptjs';
import { User } from "../schemas/userModel";

export class ProfileController {
  constructor() {
  }

  private profileService = new ProfileService();
  private userService = new UserService();
  private pathGenerator = new ImagePathGenerator();

  public getProfileDetails() {
    return catchAsync(async (req: URequest, res: Response) => {
      const id = req.params.id;
      const userData = await this.profileService.getProfileDetails(id ? new Types.ObjectId(id) : req?.user?.id);

      const profile = new ProfileDTO();
      profile.name = userData.name ?? null;
      profile.surname = userData.surname ?? null;
      profile.email = userData.email ?? null;
      profile.phoneNumber = userData.phoneNumber ?? null;
      profile.birthday = userData.birthday ?? null;
      profile.image = userData.image ?? null;

      res.status(200).json({
        status: 'success',
        items: profile
      })
    })
  }

  public createProfile() {
    return catchAsync(async (req: URequest, res: Response) => {
      const data = req.body;

      const user = await User.create(data);

      res.status(201).json({
        status: 'success',
        items: user
      })
    })
  }

  public updateProfile() {
    return catchAsync(async (req: URequest, res: Response) => {
      const id = req.params.id;

      const profile = await this.profileService.updateProfileById((id ? new Types.ObjectId(id) : req.user.id) as Types.ObjectId, req.body);

      res.status(201).json({
        status: 'success',
        items: profile
      });
    })
  }

  public updateProfileImage() {
    return catchAsync(async (req: URequest, res: Response) => {
      const filePath = req.file ? this.pathGenerator.getProfileImagePatch(req.file.filename) : '';
      const user = await this.userService.findUserByIdOrThrow(req.user.id);

      if (user?.image && user.image?.trim() !== '') {
        await this.deleteImageFile(user.image, user.id)
      }

      await this.userService.findUserByIdAndUpdate(req.user.id, {image: filePath});

      res.status(200).json({
        status: 'succes'
      });
    })
  }

  removeProfileImage() {
    return catchAsync(async (req: URequest, res: Response) => {
      let user = await this.userService.findUserByIdOrThrow(req.user.id);
      if (!user.image || user?.image?.trim() === '') throw new AppError("User have no image!", 400);
      await this.deleteImageFile(user.image, user.id);
      await this.userService.findUserByIdAndUpdate(req.user.id, {image: null});
      res.status(200).json({
        status: 'success',
        items: user
      });
    });
  }

  changePassword() {
    return catchAsync(async (req: URequest, res: Response) => {
      const resetPasswordForm = req.body as ResetPasswordForm;

      const user = await this.userService.findUserByIdOrThrow(req.user.id);
      const match = await bcrypt.compare(resetPasswordForm.oldPassword, user.password);

      if (!match) {
        throw new AppError("You provided wrong old password!", 403)
      }

      if (resetPasswordForm.newPassword !== resetPasswordForm.newPasswordRepeat) {
        throw new AppError( "New password does not match!", 403)
      }

      if (resetPasswordForm.newPassword === resetPasswordForm.oldPassword) {
        throw new AppError("Passwords are the same!", 403);
      }

      await this.userService.findUserByIdAndUpdate(req.user.id, {password: resetPasswordForm.newPassword});

      res.status(201).json({
        status: 'success'
      });
    });
  }

  async deleteImageFile(userImagePath: string, userId: string) {
    const fileName = path.basename(userImagePath);
    const pathToRemove = path.resolve(__dirname, `../../public/images/profile/${fileName}`);
    try {
      await fs.promises.unlink(pathToRemove);
    } catch (e: unknown) {
      if ((<NodeJS.ErrnoException>e).code === 'ENOENT') {
        throw new AppError('File does not exists', 404);
      } else {
        throw new AppError((<NodeJS.ErrnoException>e).message, 500);
      }
    }
  }
}