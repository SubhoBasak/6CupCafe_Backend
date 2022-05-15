import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";

import {
  newPurchase,
  delPurchase,
  ingPurchaseHistory,
} from "../controllers/purchaseController.js";

const router = express.Router();

router
  .route("/")
  .get(authUser, isAdmin, ingPurchaseHistory)
  .post(authUser, isAdmin, newPurchase)
  .delete(authUser, isAdmin, delPurchase);

export default router;
