import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";

import {
  addDelv,
  delDelv,
  editDelv,
  getAllDelv,
} from "../controllers/deliveryController.js";

const router = express.Router();

router
  .route("/")
  .get(authUser, getAllDelv)
  .post(authUser, isAdmin, addDelv)
  .put(authUser, isAdmin, editDelv)
  .delete(authUser, isAdmin, delDelv);

export default router;
