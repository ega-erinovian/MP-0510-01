import { NextFunction, Request, Response } from "express";
import { getVouchersByEventService } from "../services/vouchers/get-vouchers-by-event.service";
import { createVoucherService } from "../services/vouchers/create-voucher.service";
import { getVouchersService } from "../services/vouchers/get-vouchers.service";
import { updateVoucherService } from "../services/vouchers/update-voucher.service";
import { deleteVoucherService } from "../services/vouchers/delete-voucher.service";
import { getVoucherService } from "../services/vouchers/get-voucher.service";

export const getVouchersController = async (
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
      eventId: parseInt(req.query.eventId as string) || 0,
    };

    const result = await getVouchersService(query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getVoucherController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await getVoucherService(parseInt(id));
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

export const createVoucherController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createVoucherService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateVoucherController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await updateVoucherService(req.body, parseInt(id));
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const deleteVoucherController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteVoucherService(parseInt(id));
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
