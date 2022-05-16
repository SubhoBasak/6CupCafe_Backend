import deliveryModel from "../models/deliveryModel.js";

export const getAllDelv = async (req, res) => {
  try {
    return res.json(await deliveryModel.find().sort({ _id: -1 }).lean());
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addDelv = async (req, res) => {
  try {
    const delv = await deliveryModel.create({
      name: req.body.name,
      charge: Number.parseFloat(req.body.charge),
    });

    return res.json({ did: delv._id });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const editDelv = async (req, res) => {
  try {
    const result = await deliveryModel
      .findByIdAndUpdate(req.body.did, {
        name: req.body.name,
        charge: Number.parseFloat(req.body.charge),
      })
      .lean();

    if (result) return res.sendStatus(200);
    else return res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const delDelv = async (req, res) => {
  try {
    await deliveryModel.findByIdAndDelete(req.body.did);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
