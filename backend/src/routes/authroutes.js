import express from "express";
import { login, register } from "../controller/authController.js";
import validate from "../middleware/validate.js";
import { loginValidator, registerValidator } from "../validators/authValidators.js";

const router = express.Router();

router.post("/register", validate(registerValidator), register);
router.post("/login", validate(loginValidator), login);

export default router;
