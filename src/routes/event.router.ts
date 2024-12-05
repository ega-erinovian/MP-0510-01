import { Router } from "express";
import { getEventsController } from "../controllers/event.controller";

const router = Router();

router.get("/", getEventsController);

export default router;
