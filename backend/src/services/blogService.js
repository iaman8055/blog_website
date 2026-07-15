import ApiError from "../../utils/ApiError.js";
import Blog from "../model/Blog.js";

const getPublishedPosts = async () => {
    return await Blog.find({ status: "published" })
        .populate("author", "name email")
        .sort({ createdAt: -1 });
};

const getPostBySlug = async (slug) => {
    const post = await Blog.findOne({ slug, status: "published" }).populate("author", "name email");
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    return post;
};

const getAllPostsAdmin = async () => {
    return await Blog.find().populate("author", "name email").sort({ createdAt: -1 });
};

const getPostByIdAdmin = async (id) => {
    const post = await Blog.findById(id).populate("author", "name email");
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    return post;
};

const createPost = async (data, authorId) => {
    const post = await Blog.create({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        status: data.status,
        author: authorId
    });
    return post;
};

const updatePost = async (id, data) => {
    const post = await Blog.findById(id);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    post.title = data.title ?? post.title;
    post.excerpt = data.excerpt ?? post.excerpt;
    post.content = data.content ?? post.content;
    post.coverImage = data.coverImage ?? post.coverImage;
    post.status = data.status ?? post.status;

    if (data.title) {
        post.slug = data.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }

    await post.save();
    return post;
};

const deletePost = async (id) => {
    const post = await Blog.findById(id);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    await post.deleteOne();
};

export default {
    getPublishedPosts,
    getPostBySlug,
    getAllPostsAdmin,
    getPostByIdAdmin,
    createPost,
    updatePost,
    deletePost
};
