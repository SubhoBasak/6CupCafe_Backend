import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";

import { getFlatReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/flat", authUser, isAdmin, getFlatReport);

export default router;
