import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";

import { addProdIng, delProdIng } from "../controllers/prodIngController.js";

const router = express.Router();

router
  .route("/")
  .post(authUser, isAdmin, addProdIng)
  .delete(authUser, isAdmin, delProdIng);

export default router;
