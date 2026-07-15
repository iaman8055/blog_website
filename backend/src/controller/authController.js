import authService from "../services/authService.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    return res.status(201).json({
        success: true,
        data: result,
        message: "User registered successfully"
    });
});

export const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    return res.status(200).json({
        success: true,
        data: result,
        message: "Login successful"
    });
});
