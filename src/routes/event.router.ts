import { Router } from "express";
import {
  deleteEventController,
  getEventController,
  getEventsController,
  updateEventController,
} from "../controllers/event.controller";
import { uploader } from "../lib/multer";
import { fileFilter } from "../lib/fileFilter";

const router = Router();

router.get("/", getEventsController);
router.get("/:id", getEventController);
router.patch(
  "/:id",
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  fileFilter,
  updateEventController
);
router.delete("/:id", deleteEventController);

export default router;
