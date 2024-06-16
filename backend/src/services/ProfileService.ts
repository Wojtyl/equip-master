import { User } from "../schemas/userModel";
import { AppError } from "../utils/appError";
import { Types } from "mongoose";

export class ProfileService {
  constructor() {
  }

  public async getProfileDetails(userId: Types.ObjectId) {
    return User.findById(userId)
        .select(['email', 'name', 'surname', '-_id', 'phoneNumber', 'birthday', 'image']).orFail(new AppError("There is no user with that ID", 404));
  }

  public async updateProfileById(userId: Types.ObjectId, profile: any ) {
    if (!!profile.birthday) profile.birthday = new Date(profile.birthday);
    return User.findByIdAndUpdate(userId, profile);
  }
}