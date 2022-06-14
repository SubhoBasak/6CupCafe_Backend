import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";

import { allTax, addTax, delTax } from "../controllers/taxController.js";

const router = express.Router();

router
  .route("/")
  .get(authUser, allTax)
  .post(authUser, isAdmin, addTax)
  .delete(authUser, isAdmin, delTax);

export default router;
