"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const index_1 = require("../model/index");
class UserController {
    // Register a new user with email verification
    register = async (params) => {
        try {
            process.stderr.write(`params: ${JSON.stringify(params)}\n`);
            const { name, email, password, role } = params;
            const existingUser = await index_1.User.findOne({ where: { email } });
            if (existingUser) {
                return {
                    status: false,
                    message: "Email already in use",
                };
            }
            const user = await index_1.User.create({ name, email, password, role });
            return {
                status: true,
                message: "User Created successfully",
                data: user,
            };
        }
        catch (err) {
            return {
                status: false,
                message: err,
            };
        }
    };
    getAll = async () => {
        try {
            const users = await index_1.User.findAll();
            return {
                status: true,
                message: "User Created successfully",
                data: users,
            };
        }
        catch (err) {
            return {
                status: false,
                message: err,
            };
        }
    };
    getUserById = async (params) => {
        try {
            const { id } = params;
            const user = await index_1.User.findByPk(id);
            if (!user) {
                return {
                    status: false,
                    message: "User not found",
                    data: null,
                };
            }
            return {
                status: true,
                message: "User fetched successfully",
                data: user,
            };
        }
        catch (err) {
            return {
                status: false,
                message: err.message,
            };
        }
    };
}
exports.UserController = UserController;
