import { NextFunction, Request, Response } from "express";
import { getEventsService } from "../services/event/get-events.service";
import { getCountriesService } from "../services/country/get-countries.service";
import { getCategoriesService } from "../services/categories/get-categories.service";

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getCategoriesService();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
