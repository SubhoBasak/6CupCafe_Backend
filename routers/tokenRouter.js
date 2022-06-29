import express from "express";

import authUser from "../middlewares/authUser.js";

import { curToken, resetToken } from "../controllers/tokenController.js";

const router = express.Router();

router.route("/").get(authUser, curToken).put(authUser, resetToken);

export default router;
