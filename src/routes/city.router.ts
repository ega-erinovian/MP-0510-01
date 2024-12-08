import { Router } from "express";
import {
  getCitiesByCountryController,
  getCitiesController,
} from "../controllers/city.controller";

const router = Router();

router.get("/", getCitiesController);
router.get("/filter/country", getCitiesByCountryController);

export default router;
