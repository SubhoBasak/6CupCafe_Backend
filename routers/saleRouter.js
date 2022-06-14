import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";
import isCashier from "../middlewares/isCashier.js";
import isCook from "../middlewares/isCook.js";

import {
  getCstOrders,
  getCurOrders,
  newSale,
} from "../controllers/saleController.js";

const router = express.Router();

router
  .route("/")
  .get(authUser, isCook, getCurOrders)
  .post(authUser, isCashier, newSale);

router.get("/cst_orders", authUser, isAdmin, getCstOrders);

export default router;
