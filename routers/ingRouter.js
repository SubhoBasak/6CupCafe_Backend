import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";

import { allIng, addIng, delIng } from "../controllers/ingController.js";

const router = express.Router();

router
  .route("/")
  .get(authUser, isAdmin, allIng)
  .post(authUser, isAdmin, addIng)
  .delete(authUser, isAdmin, delIng);

export default router;
