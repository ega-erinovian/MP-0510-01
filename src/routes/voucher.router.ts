import { Router } from "express";
import {
  getVouchersByEventController,
  getVouchersController,
} from "../controllers/voucher.controller";

const router = Router();

router.get("/", getVouchersController);
router.get("/filter/event", getVouchersByEventController);

export default router;
