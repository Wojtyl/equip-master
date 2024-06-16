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

export class ProfileController {
  constructor() {
  }

  private profileService = new ProfileService();
  private userService = new UserService();
  private pathGenerator = new ImagePathGenerator();

  public getProfileDetails() {
    return catchAsync(async (req: URequest, res: Response) => {
      const userData = await this.profileService.getProfileDetails(req.user.id as Types.ObjectId);

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

  public updateProfile() {
    return catchAsync(async (req: URequest, res: Response) => {

      await this.profileService.updateProfileById(req.user.id as Types.ObjectId, req.body);

      res.status(201).json({});
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