import { NextFunction, Request, Response } from "express";
import { getCitiesService } from "../services/city/get-cities.service";
import { getCitiesByCountryService } from "../services/city/get-cities-by-country.service";
import { count } from "console";

export const getCitiesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getCitiesService();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getCitiesByCountryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const country = req.query.country as string;
    const result = await getCitiesByCountryService(country);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
