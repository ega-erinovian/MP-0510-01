import { Router } from "express";
import { getAttendeesController } from "../controllers/attendee.controller";

const router = Router();

router.get("/:id", getAttendeesController);

export default router;
