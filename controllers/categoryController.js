import categoryModel from "../models/categoryModel.js";

export const allCategory = async (req, res) => {
  try {
    return res.json(await categoryModel.find().lean());
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addCategory = async (req, res) => {
  try {
    await categoryModel.create({ category: req.body.category });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const delCategory = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.body.cid);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
