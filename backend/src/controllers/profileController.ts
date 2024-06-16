import { catchAsync } from "../utils/catchAsync";
import { URequest } from "../interfaces/user-request";
import { Response } from "express";
import { ProfileService } from "../services/ProfileService";
import { Types } from "mongoose";
import { ProfileDTO } from "../models/profile-model";

export class ProfileController {
  constructor() {}

  private profileService = new ProfileService();

  public getProfileDetails() {
    return catchAsync(async (req: URequest, res: Response) => {
      const userData = await this.profileService.getProfileDetails(req.user.id as Types.ObjectId);

      const profile = new ProfileDTO();
      profile.name = userData.name ?? null;
      profile.surname = userData.surname ?? null;
      profile.email = userData.email ?? null;
      profile.phoneNumber = userData.phoneNumber ?? null;
      profile.birthday = userData.birthday ?? null;

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
}