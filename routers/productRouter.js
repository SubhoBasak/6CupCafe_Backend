import express from "express";

import authUser from "../middlewares/authUser.js";
import isAdmin from "../middlewares/isAdmin.js";
import isCashier from "../middlewares/isCashier.js";
import isCook from "../middlewares/isCook.js";

import {
  addProduct,
  delProduct,
  editProduct,
  getProduct,
  getProductDetails,
  prodInStock,
  prodOutOfStock,
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
router.get("/cook", authUser, isCook, getProduct);
router.put("/stock_in", authUser, prodInStock);
router.put("/stock_out", authUser, prodOutOfStock);

export default router;
