import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";

import {
  getFlatReport,
  getProductReport,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/flat", authUser, isAdmin, getFlatReport);
router.get("/product", authUser, isAdmin, getProductReport);

export default router;
