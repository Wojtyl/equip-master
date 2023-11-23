import { User } from "../schemas/userModel";
import { AppError } from "../utils/appError";

export class UserService {

    public async findUserByIdOrThrow(userId: string) {
        const user = await User.findById(userId);
        if (user) {
            return user;
        } else {
            throw new AppError("User not found", 404);
        }
    }
}