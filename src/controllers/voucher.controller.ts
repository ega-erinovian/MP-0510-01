import { NextFunction, Request, Response } from "express";
import { getVouchersService } from "../services/vouchers/get-vouchers.service";
import { getVouchersByEventService } from "../services/vouchers/get-vouchers-by-event.service";

export const getVouchersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getVouchersService();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getVouchersByEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id;
    const result = await getVouchersByEventService(Number(id));
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
