import { NextFunction, Request, Response } from "express";
import { getEventsService } from "../services/event/get-events.service";
import { getCountriesService } from "../services/country/get-countries.service";

export const getCountriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      cityId: parseInt(req.query.cityId as string) || 0,
    };

    const result = await getCountriesService(query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
