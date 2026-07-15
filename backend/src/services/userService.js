import ApiError from "../../utils/ApiError.js";
import User from "../model/User.js";
import bcrypt from "bcrypt";

const createUser = async ({ name, email, password, role }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "USER"
    });

    const { password: _password, ...safeUser } = user.toObject();
    return safeUser;
};

const getAllUsers = async () => {
    return await User.find().select("-password").sort({ createdAt: -1 });
};

const getUserById = async (id) => {
    const user = await User.findById(id).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return user;
};

const deleteUser = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    await user.deleteOne();
};

const updateUser = async (id, data) => {
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.name = data.name || user.name;
    user.email = data.email || user.email;

    if (data.role) {
        user.role = data.role;
    }

    await user.save();

    const { password, ...safeUser } = user.toObject();
    return safeUser;
};

export default { createUser, getAllUsers, getUserById, deleteUser, updateUser };
