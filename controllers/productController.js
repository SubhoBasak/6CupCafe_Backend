import fs from "fs";

import categoryModel from "../models/categoryModel.js";
import prodIngModel from "../models/prodIngModel.js";
import productModel from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const catg = await categoryModel.findById(req.body.cid);
    if (!catg) return res.sendStatus(404);

    const prod = await productModel.create({
      name: req.body.name,
      price: Number.parseFloat(req.body.price),
      category: catg._id,
    });

    req.files.image.mv("static/" + prod._id + ".jpg");

    return res.json({ pid: prod._id });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getProduct = async (req, res) => {
  try {
    return res.json(await productModel.find().populate("category").lean());
  } catch (error) {
    console.log(error);
    return req.sendStatus(500);
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const prod = await productModel.findOne({ _id: req.query.pid }).lean();
    if (!prod) return res.sendStatus(404);

    const ings = await prodIngModel
      .find({ prod: prod._id })
      .select("ing qnt")
      .populate("ing")
      .lean();

    return res.json({ ...prod, ings });
  } catch (error) {
    console.log(error);
    return req.sendStatus(500);
  }
};

export const delProduct = async (req, res) => {
  try {
    const prod = await productModel.findById(req.body.pid);
    if (!prod) return res.sendStatus(404);

    await prod.delete();
    fs.unlink("static/" + prod._id + ".jpg", () => {});
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const editProduct = async (req, res) => {
  try {
    const prod = await productModel.findById(req.body.pid);
    if (!prod) return res.sendStatus(404);

    const catg = await categoryModel.findById(req.body.cid);
    if (!catg) return res.sendStatus(404);

    if (req.files && req.files.image)
      req.files.image.mv("static/" + prod._id + ".jpg");
    else {
      prod.name = req.body.name;
      prod.price = Number.parseFloat(req.body.price);
      prod.category = catg._id;

      await prod.save();
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const setStock = async (req, res) => {
  try {
    const result = await productModel
      .findByIdAndUpdate(req.body.pid, {
        stock: Number.parseInt(req.body.stock),
      })
      .lean();

    if (result) return res.sendStatus(200);
    else return res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
