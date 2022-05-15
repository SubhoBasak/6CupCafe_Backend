import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";

import {
  allCategory,
  addCategory,
  delCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router
  .route("/")
  .get(authUser, allCategory)
  .post(authUser, addCategory)
  .delete(authUser, delCategory);

export default router;
