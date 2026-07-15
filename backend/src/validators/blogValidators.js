import { body } from "express-validator";

export const createPostValidator = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("content").trim().notEmpty().withMessage("Content is required"),
    body("status").optional().isIn(["draft", "published"]).withMessage("Status must be draft or published")
];

export const updatePostValidator = [
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
    body("content").optional().trim().notEmpty().withMessage("Content cannot be empty"),
    body("status").optional().isIn(["draft", "published"]).withMessage("Status must be draft or published")
];
