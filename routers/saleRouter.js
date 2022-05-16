import express from "express";

import authUser from "../middlewares/authUser.js";
import isCashier from "../middlewares/isCashier.js";
import isCook from "../middlewares/isCook.js";

import { getCurOrders, newSale } from "../controllers/saleController.js";

const router = express.Router();

router
  .route("/")
  .get(authUser, isCook, getCurOrders)
  .post(authUser, isCashier, newSale);

export default router;
