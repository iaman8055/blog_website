import userService from "../services/userService.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    return res.status(201).json({
        message: "User created successfully",
        user
    });
});

export const getUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();
    return res.status(200).json({
        message: "Users fetched successfully",
        users
    });
});

export const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).json({
        message: "User fetched successfully",
        user
    });
});

export const deleteUser = asyncHandler(async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.status(200).json({
        message: "User deleted successfully"
    });
});

export const updateUser = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({
        message: "User updated successfully",
        user
    });
});
