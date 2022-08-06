import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";

import {
  addDiscount,
  delDiscount,
  getAllDiscount,
} from "../controllers/discountController.js";

const router = express.Router();

router
  .route("/")
  .get(authUser, getAllDiscount)
  .post(authUser, isAdmin, addDiscount)
  .delete(authUser, isAdmin, delDiscount);

export default router;
