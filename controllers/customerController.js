import customerModel from "../models/customerModel.js";

export const filterCst = async (req, res) => {
  try {
    return res.json(
      await customerModel
        .findOne({ phone: { $regex: req.query.phone + ".*" } })
        .select("name")
        .lean()
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const allCustomer = async (req, res) => {
  try {
    return res.json(await customerModel.find().lean());
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const makeNote = async (req, res) => {
  try {
    await customerModel.findByIdAndUpdate(req.body.cst, {
      note: req.body.note,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
