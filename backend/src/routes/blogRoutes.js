import express from "express";
import authmiddleware from "../middleware/authMiddleware.js";
import authorize from "../middleware/rolemiddleware.js";
import validate from "../middleware/validate.js";
import { createPostValidator, updatePostValidator } from "../validators/blogValidators.js";
import {
    createPost,
    deletePost,
    getAllPostsAdmin,
    getPostByIdAdmin,
    getPostBySlug,
    getPosts,
    updatePost
} from "../controller/blogController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/admin", authmiddleware, authorize("Admin"), getAllPostsAdmin);
router.get("/admin/:id", authmiddleware, authorize("Admin"), getPostByIdAdmin);
router.get("/:slug", getPostBySlug);

router.post("/", authmiddleware, authorize("Admin"), validate(createPostValidator), createPost);
router.patch("/:id", authmiddleware, authorize("Admin"), validate(updatePostValidator), updatePost);
router.delete("/:id", authmiddleware, authorize("Admin"), deletePost);

export default router;
