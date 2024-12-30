import { NextFunction, Request, Response } from "express";
import { deleteEventService } from "../services/event/delete-event.service";
import { getEventService } from "../services/event/get-event.service";
import { getEventsService } from "../services/event/get-events.service";
import { updateEventService } from "../services/event/update-event.service";
import { createEventService } from "../services/event/create-event.service";

export const getEventsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      take: parseInt(req.query.take as string) || 3,
      page: parseInt(req.query.page as string) || 1,
      sortBy: (req.query.sortBy as string) || "id",
      sortOrder: (req.query.sortOrder as string) || "desc",
      search: (req.query.search as string) || "",
      categoryId: parseInt(req.query.categoryId as string) || 0,
      userId: parseInt(req.query.userId as string) || 0,
    };

    const result = await getEventsService(query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await getEventService(parseInt(id));
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const createEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const thumbnail = files?.thumbnnail?.[0];

    const result = await createEventService(req.body, thumbnail);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const thumbnail = files?.thumbnnail?.[0];

    const result = await updateEventService(req.body, Number(id), thumbnail);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const deleteEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteEventService(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
