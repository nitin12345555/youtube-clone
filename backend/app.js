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

connectDB();
const allowedOrigins = [
  "http://localhost:3000",
  "https://youtube-clone-eosin-five.vercel.app"
];
app.use(cors({ origin: allowedOrigins }));


app.get("/", (req, res) => res.send("Backend is live"));

app.use("/api/search", searchRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/saved-videos", savedVideoRoutes);


app.all("*", (req, res, next) => next(new AppError("Route not found", 404)));
app.use(globalErrorHandler);

// --- Vercel Export ---
export default app;
