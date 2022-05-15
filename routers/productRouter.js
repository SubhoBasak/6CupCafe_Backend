import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";
import isCashier from "../middlewares/isCashier.js";

import {
  addProduct,
  delProduct,
  editProduct,
  getProduct,
  getProductDetails,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(authUser, isAdmin, getProduct)
  .post(authUser, isAdmin, addProduct)
  .put(authUser, isAdmin, editProduct)
  .delete(authUser, isAdmin, delProduct);

router.get("/details", authUser, isAdmin, getProductDetails);
router.get("/cashier", authUser, isCashier, getProduct);

export default router;
