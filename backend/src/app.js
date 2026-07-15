import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authroutes from "./routes/authroutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import ApiError from "../utils/ApiError.js";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Allow only your Vercel frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies or auth headers if needed
  optionsSuccessStatus: 200 
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth", authroutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", blogRoutes);

app.use((req, res, next) => {
    next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

app.use((err, req, res, next) => {
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0] || "field";
        return res.status(409).json({
            success: false,
            message: `A record with that ${field} already exists`
        });
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    return res.status(statusCode).json({
        success: false,
        message
    });
});

export default app;
