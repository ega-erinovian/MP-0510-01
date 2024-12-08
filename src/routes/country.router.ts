import { Router } from "express";
import { getCountriesController } from "../controllers/country.controller";

const router = Router();

router.get("/", getCountriesController);

export default router;
