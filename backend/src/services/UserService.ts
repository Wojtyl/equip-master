import { User } from "../schemas/userModel";
import { AppError } from "../utils/appError";

export class UserService {

    public async findUserByIdOrThrow(userId: string) {
        return User.findOne({_id: userId})
            .orFail(this.throwUserNotFound());
    }

    public async findUserByIdAndUpdate(userId: string, toUpdate: any) {
        return User.findByIdAndUpdate(userId, toUpdate, {
            new: true,
            runValidators: true
        }).orFail(this.throwUserNotFound());
    }

    public async getAllUsers() {
        return User.find()
            .select('-resetToken -signupDate -birthday -__v -password')
            .orFail(() => new AppError("An Error happened while fetching all users", 500));
    }

    private throwUserNotFound() {
        return new AppError("User not found", 404);
    }
}