import { catchAsync } from "../utils/catchAsync";
import { NextFunction, Response } from "express";
import { User } from "../schemas/userModel";
import { URequest } from "../interfaces/user-request";
import { RoleService } from "../services/RoleService";
import { UserService } from "../services/UserService";

const userService = new UserService();
const roleService = new RoleService();

export const getCurrentUserRole = () => catchAsync(async (req: URequest, res: Response, next: NextFunction) => {
    try {
        const role = await roleService.findUserRole(req.user.id);
        res.status(200).json({ role })
    } catch (err) {
        next(err);
    }
})

export const getUserRoleById = () => catchAsync(async (req: URequest, res: Response, next: NextFunction) => {
    const user = await userService.findUserByIdOrThrow(req.params.id);
    res.status(200).json({
        username: user.name,
        role: user.role
    })
})

export const updateUserRole = () => catchAsync(async (req: URequest, res: Response, next: NextFunction) => {
        const user = await userService.findUserByIdAndUpdate(req.params.id, { role: req.body.role})
        res.status(200).json(user);
})