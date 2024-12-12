import { Router } from "express";
import { getCountriesController } from "../controllers/country.controller";
import { getCategoriesController } from "../controllers/category.controller";

const router = Router();

router.get("/", getCategoriesController);

export default router;
