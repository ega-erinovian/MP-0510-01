import { NextFunction, Request, Response } from "express";
import { getTransactionsService } from "../services/transactions/get-transactions.service";
import { deleteTransactionService } from "../services/transactions/delete-transaction.service";
import { updateTransactionService } from "../services/transactions/update-transaction.service";
import { getTransactionQuantityService } from "../services/transactions/get-transactions-qty.service";
import { log } from "console";
import { getTransactionIncomeService } from "../services/transactions/get-transactions-income.service";
import { getTransactionIncomePerMonthService } from "../services/transactions/get-transactions-income-per-month.service";

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
      status: (req.query.status as string) || "",
      eventId: parseInt(req.query.eventId as string) || 0,
      userId: parseInt(req.query.userId as string) || 0,
    };

    const result = await getTransactionsService(query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getTransactionsQuantityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      timeFilter: (req.query.timeFilter as string) || "day",
      eventId: parseInt(req.query.eventId as string) || 0,
      userId: parseInt(req.query.userId as string) || 0,
    };

    const result = await getTransactionQuantityService(query);

    res.status(200).send({ qty: result });
  } catch (error) {
    next(error);
  }
};

export const getTransactionsIncomeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      timeFilter: (req.query.timeFilter as string) || "day",
      eventId: parseInt(req.query.eventId as string) || 0,
      userId: parseInt(req.query.userId as string) || 0,
    };

    const result = await getTransactionIncomeService(query);

    res.status(200).send({ income: result });
  } catch (error) {
    next(error);
  }
};

export const getTransactionsIncomePerMonthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      eventId: parseInt(req.query.eventId as string) || 0,
      userId: parseInt(req.query.userId as string) || 0,
    };

    const result = await getTransactionIncomePerMonthService(query);

    res.status(200).send({ income: result });
  } catch (error) {
    next(error);
  }
};

export const updateTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await updateTransactionService(req.body, parseInt(id));
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const deleteTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    //   const userId = Number(res.locals.user.id); // Mengambil id dari token milik user
    const result = await deleteTransactionService(id /*userId*/);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
