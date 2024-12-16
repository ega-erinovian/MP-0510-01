import { NextFunction, Request, Response } from "express";
import { getTransactionsService } from "../services/transactions/get-transactions.service";

export const getTransactionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      take: parseInt(req.query.take as string) || 10,
      page: parseInt(req.query.page as string) || 1,
      sortBy: (req.query.sortBy as string) || "id",
      sortOrder: (req.query.sortOrder as string) || "desc",
      search: (req.query.search as string) || "",
    };

    const result = await getTransactionsService(query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
