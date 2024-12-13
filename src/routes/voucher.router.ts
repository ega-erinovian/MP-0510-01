import { Router } from "express";
import {
  createVoucherController,
  getVouchersByEventController,
  getVouchersController,
  updateVoucherController,
} from "../controllers/voucher.controller";
import {
  validateCreateVoucher,
  validateUpdateVoucher,
} from "../validators/voucher.validator";

const router = Router();

router.get("/", getVouchersController);
router.get("/filter/event", getVouchersByEventController);
router.post("/", validateCreateVoucher, createVoucherController);
router.patch("/:id", validateUpdateVoucher, updateVoucherController);

export default router;
