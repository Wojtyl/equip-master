import { catchAsync } from "../utils/catchAsync";
import { URequest } from "../interfaces/user-request";
import { Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {

  changePassword() {
    return catchAsync(async (req: URequest, res: Response) => {
    });
  }

  public userService = new UserService();

  getAllUsers() {
    return catchAsync(async (req: URequest, res: Response) => {
      const users = await this.userService.getAllUsers();

      res.status(200).json({
        status: 'success',
        items: users
      })
    });
  }
}