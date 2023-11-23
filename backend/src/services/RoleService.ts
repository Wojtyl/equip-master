import { Roles } from "../enums/roles-enum";
import { UserService } from "./UserService";

const userService = new UserService();

export class RoleService {
    constructor() {
    }

    async findUserRole(userId: string): Promise<string> {
        const user = await userService.findUserByIdOrThrow(userId);
        return user.role;
    }

    async isAdmin(userId: string) {
        return await this.findUserRole(userId) === Roles.Admin;
    }

    async isManager(userId: string) {
        return await this.findUserRole(userId) === Roles.Manager;
    }

    async isEmployee(userId: string) {
        return await this.findUserRole(userId) === Roles.Employee;
    }

    async isUser(userId: string) {
        return await this.findUserRole(userId) === Roles.User;
    }
}