import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";

import {
  allCustomer,
  filterCst,
  makeNote,
} from "../controllers/customerController.js";

const router = express.Router();

router.route("/").get(authUser, filterCst).post(authUser, makeNote);
router.get("/all", authUser, isAdmin, allCustomer);

export default router;
