import client from "./client";

export const getPosts = () => client.get("/posts").then((res) => res.data.posts);

export const getPostBySlug = (slug) => client.get(`/posts/${slug}`).then((res) => res.data.post);

export const getAllPostsAdmin = () => client.get("/posts/admin").then((res) => res.data.posts);

export const getPostByIdAdmin = (id) => client.get(`/posts/admin/${id}`).then((res) => res.data.post);

export const createPost = (data) => client.post("/posts", data).then((res) => res.data.post);

export const updatePost = (id, data) => client.patch(`/posts/${id}`, data).then((res) => res.data.post);

export const deletePost = (id) => client.delete(`/posts/${id}`).then((res) => res.data);
