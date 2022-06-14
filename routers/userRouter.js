import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";

import {
  login,
  addEmployee,
  allEmployee,
  delEmployee,
  editEmployee,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", login);
router
  .route("/employee")
  .get(authUser, isAdmin, allEmployee)
  .post(authUser, isAdmin, addEmployee)
  .put(authUser, isAdmin, editEmployee)
  .delete(authUser, isAdmin, delEmployee);

export default router;
