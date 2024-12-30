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
    const query = {
      countryId: parseInt(req.query.countryId as string) || 0,
      search: (req.query.search as string) || "",
    };
    const result = await getCitiesService(query);
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
