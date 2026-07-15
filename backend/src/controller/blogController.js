import blogService from "../services/blogService.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getPosts = asyncHandler(async (req, res) => {
    const posts = await blogService.getPublishedPosts();
    return res.status(200).json({
        message: "Posts fetched successfully",
        posts
    });
});

export const getPostBySlug = asyncHandler(async (req, res) => {
    const post = await blogService.getPostBySlug(req.params.slug);
    return res.status(200).json({
        message: "Post fetched successfully",
        post
    });
});

export const getAllPostsAdmin = asyncHandler(async (req, res) => {
    const posts = await blogService.getAllPostsAdmin();
    return res.status(200).json({
        message: "Posts fetched successfully",
        posts
    });
});

export const getPostByIdAdmin = asyncHandler(async (req, res) => {
    const post = await blogService.getPostByIdAdmin(req.params.id);
    return res.status(200).json({
        message: "Post fetched successfully",
        post
    });
});

export const createPost = asyncHandler(async (req, res) => {
    const post = await blogService.createPost(req.body, req.user.id);
    return res.status(201).json({
        message: "Post created successfully",
        post
    });
});

export const updatePost = asyncHandler(async (req, res) => {
    const post = await blogService.updatePost(req.params.id, req.body);
    return res.status(200).json({
        message: "Post updated successfully",
        post
    });
});

export const deletePost = asyncHandler(async (req, res) => {
    await blogService.deletePost(req.params.id);
    return res.status(200).json({
        message: "Post deleted successfully"
    });
});
