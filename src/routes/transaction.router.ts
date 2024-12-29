import { Router } from "express";
import {
  createTransactionController,
  deleteTransactionController,
  getRemainingTimeController,
  getTransactionsController,
  getTransactionsIncomeController,
  getTransactionsIncomePerMonthController,
  getTransactionsQuantityController,
  updateTransactionController,
} from "../controllers/transaction.controller";
import { fileFilter } from "../lib/fileFilter";
import { verifyToken } from "../lib/jwt";
import { uploader } from "../lib/multer";
import {
  validateCreateTransaction,
  validateUpdateTransaction,
} from "../validators/transaction.validator";

const router = Router();

router.get("/", getTransactionsController);
router.get("/filter/quantity", getTransactionsQuantityController);
router.get("/filter/income", getTransactionsIncomeController);
router.get("/filter/income-per-month", getTransactionsIncomePerMonthController);
router.get("/:id/time-left", getRemainingTimeController);
router.post(
  "/",
  verifyToken,
  uploader().fields([{ name: "paymentProof", maxCount: 1 }]),
  fileFilter,
  validateCreateTransaction,
  createTransactionController
);
router.patch(
  "/:id",
  verifyToken,
  uploader().fields([{ name: "paymentProof", maxCount: 1 }]),
  fileFilter,
  validateUpdateTransaction,
  updateTransactionController
);
router.delete("/:id", verifyToken, deleteTransactionController);

export default router;
