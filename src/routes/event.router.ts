import { Router } from "express";
import {
  deleteEventController,
  getEventsController,
} from "../controllers/event.controller";

const router = Router();

router.get("/", getEventsController);
router.delete("/:id", deleteEventController);

export default router;
