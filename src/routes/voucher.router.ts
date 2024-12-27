import { Router } from "express";
import {
  createVoucherController,
  deleteVoucherController,
  getVoucherController,
  getVouchersByEventController,
  getVouchersController,
  updateVoucherController,
} from "../controllers/voucher.controller";
import {
  validateCreateVoucher,
  validateUpdateVoucher,
} from "../validators/voucher.validator";
import { verifyToken } from "../lib/jwt";

const router = Router();

router.get("/", getVouchersController);
router.get("/:id", getVoucherController);
router.get("/filter/event", getVouchersByEventController);
router.post("/", verifyToken, validateCreateVoucher, createVoucherController);
router.patch(
  "/:id",
  verifyToken,
  validateUpdateVoucher,
  updateVoucherController
);
router.delete("/:id", verifyToken, deleteVoucherController);

export default router;
