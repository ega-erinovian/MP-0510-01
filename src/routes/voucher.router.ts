import { Router } from "express";
import {
  createVoucherController,
  getVouchersByEventController,
  getVouchersController,
} from "../controllers/voucher.controller";
import { validateCreateVoucher } from "../validators/voucher.validator";

const router = Router();

router.get("/", getVouchersController);
router.get("/filter/event", getVouchersByEventController);
router.post("/", validateCreateVoucher, createVoucherController);

export default router;
