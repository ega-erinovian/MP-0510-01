import { NextFunction, Request, Response } from "express";
import { getSamplesService } from "../services/get-samples.service";
import { getSampleService } from "../services/get-sample.service";

export const getSamplesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getSamplesService();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getSampleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await getSampleService(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
