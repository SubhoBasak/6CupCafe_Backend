import express from "express";
import mongoose from "mongoose";
import upload from "express-fileupload";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";

import categoryRouter from "./routers/categoryRouter.js";
import customerRouter from "./routers/customerRouter.js";
import ingRouter from "./routers/ingRouter.js";
import productRouter from "./routers/productRouter.js";
import prodIngRouter from "./routers/prodIngRouter.js";
import purchaseRouter from "./routers/purchaseRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();

// global middlewares
app.use(helmet());
app.use(cors());
app.use(upload({ limits: 5242880 }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use("/static", express.static("static"));

mongoose.connect(process.env.MONGO_DB, () => console.log("DB connected"));

app.use("/category", categoryRouter);
app.use("/customer", customerRouter);
app.use("/ing", ingRouter);
app.use("/product", productRouter);
app.use("/prodIng", prodIngRouter);
app.use("/purchase", purchaseRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => console.log("Server is running"));
