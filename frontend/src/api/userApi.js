import client from "./client";

export const createUser = (data) => client.post("/users", data).then((res) => res.data.user);

export const getUsers = () => client.get("/users").then((res) => res.data.users);

export const getUserById = (id) => client.get(`/users/${id}`).then((res) => res.data.user);

export const updateUser = (id, data) => client.patch(`/users/${id}`, data).then((res) => res.data.user);

export const deleteUser = (id) => client.delete(`/users/${id}`).then((res) => res.data);
