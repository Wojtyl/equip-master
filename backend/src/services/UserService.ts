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

    private throwUserNotFound() {
        return new AppError("User not found", 404);
    }
}