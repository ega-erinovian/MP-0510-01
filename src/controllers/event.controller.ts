import { NextFunction, Request, Response } from "express";
import { getEventsService } from "../services/event/get-events.service";

export const getEventsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getEventsService();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
