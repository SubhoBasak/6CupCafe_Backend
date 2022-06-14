import taxModel from "../models/taxModel.js";

export const allTax = async (req, res) => {
  try {
    return res.json(await taxModel.find().sort({ _id: -1 }).lean());
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addTax = async (req, res) => {
  try {
    const tax = await taxModel.create({
      name: req.body.name,
      tax: Number.parseFloat(req.body.tax),
    });

    return res.json({ tid: tax._id });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const delTax = async (req, res) => {
  try {
    await taxModel.findByIdAndDelete(req.body.tid).lean();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
