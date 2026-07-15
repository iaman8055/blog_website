import express from "express";
import authmiddleware from "../middleware/authMiddleware.js";
import authorize from "../middleware/rolemiddleware.js";
import validate from "../middleware/validate.js";
import { createUserValidator, updateUserValidator } from "../validators/userValidators.js";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controller/userController.js";

const router = express.Router();

router.get("/", authmiddleware, authorize("Admin"), getUsers);
router.post("/", authmiddleware, authorize("Admin"), validate(createUserValidator), createUser);
router.get("/:id", authmiddleware, authorize("Admin"), getUserById);
router.patch("/:id", authmiddleware, authorize("Admin"), validate(updateUserValidator), updateUser);
router.delete("/:id", authmiddleware, authorize("Admin"), deleteUser);

export default router;
