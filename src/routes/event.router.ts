import { Router } from "express";
import {
  createEventController,
  deleteEventController,
  getEventController,
  getEventsController,
  updateEventController,
} from "../controllers/event.controller";
import { uploader } from "../lib/multer";
import { fileFilter } from "../lib/fileFilter";
import { verifyToken } from "../lib/jwt";
import { validateCreateEvent } from "../validators/event.validator";

const router = Router();

router.get("/", getEventsController);
router.get("/:id", getEventController);
router.post(
  "/",
  verifyToken,
  uploader().fields([{ name: "thumbnnail", maxCount: 1 }]),
  fileFilter,
  validateCreateEvent,
  createEventController
);
router.patch(
  "/:id",
  verifyToken,
  uploader().fields([{ name: "thumbnnail", maxCount: 1 }]),
  fileFilter,
  updateEventController
);
router.delete("/:id", deleteEventController);

export default router;
