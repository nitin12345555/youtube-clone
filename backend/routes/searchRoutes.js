import express from "express";
import { searchYouTube } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", searchYouTube);

export default router;