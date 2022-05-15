import express from "express";

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
  .get(allEmployee)
  .post(addEmployee)
  .put(editEmployee)
  .delete(delEmployee);

export default router;
