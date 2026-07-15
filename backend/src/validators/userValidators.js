import { body } from "express-validator";

export const createUserValidator = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("A valid email is required").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").optional().isIn(["USER", "Admin"]).withMessage("Role must be USER or Admin")
];

export const updateUserValidator = [
    body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
    body("email").optional().isEmail().withMessage("A valid email is required").normalizeEmail(),
    body("role").optional().isIn(["USER", "Admin"]).withMessage("Role must be USER or Admin")
];
