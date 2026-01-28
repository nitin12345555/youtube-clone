import express from "express";
import {
  getAllCollections,
  createCollection,
  updateCollectionName,
  deleteCollection,
  addVideoToCollection,
  removeVideoFromCollection,
} from "../controllers/collectionController.js";

const router = express.Router();

router.route("/")
  .get(getAllCollections)
  .post(createCollection);

router.route("/:id")
  .put(updateCollectionName)
  .delete(deleteCollection);

router.post("/:id/videos", addVideoToCollection);
router.delete("/:id/videos/:videoId", removeVideoFromCollection);

export default router;
