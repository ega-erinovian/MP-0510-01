import { NextFunction, Request, Response } from "express";
import { getReviewsService } from "../services/review/get-reviews.service";
import { getAttendeesService } from "../services/attendeeList/get-attendees.service";
import { parse } from "path";

export const getAttendeesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const query = {
      take: parseInt(req.query.take as string) || 10,
      page: parseInt(req.query.page as string) || 1,
      sortBy: (req.query.sortBy as string) || "id",
      sortOrder: (req.query.sortOrder as string) || "desc",
      search: (req.query.search as string) || "",
    };

    const result = await getAttendeesService(id, query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
