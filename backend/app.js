import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import searchRoutes from "./routes/searchRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import savedVideoRoutes from "./routes/savedVideos.js";
import AppError from "./utils/AppError.js";
import globalErrorHandler from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

connectDB();

app.get("/", (req, res) => res.send("Backend is live"));

app.use("/api/search", searchRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/saved-videos", savedVideoRoutes);

app.all("*", (req, res, next) => next(new AppError("Route not found", 404)));
app.use(globalErrorHandler);

export default app;
