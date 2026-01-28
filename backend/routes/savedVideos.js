import express from "express";
import { 
    getSavedVideos, 
    saveVideo, 
    deleteSavedVideo 
} from "../controllers/savedVideoController.js";

const router = express.Router();

router.route("/")
.get(getSavedVideos)
    .post(saveVideo);

router.delete("/:videoId", deleteSavedVideo);

export default router;