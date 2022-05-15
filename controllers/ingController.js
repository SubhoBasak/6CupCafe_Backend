import ingModel from "../models/ingModel.js";

export const addIng = async (req, res) => {
  try {
    const ing = await ingModel.create({
      name: req.body.name,
      unit: req.body.unit,
    });

    return res.json({ iid: ing._id });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const allIng = async (req, res) => {
  try {
    return res.json(await ingModel.find().sort({ _id: -1 }).lean());
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const delIng = async (req, res) => {
  try {
    await ingModel.findByIdAndDelete(req.body.iid);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
