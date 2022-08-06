import discountModel from "../models/discountModel.js";

export const getAllDiscount = async (req, res) => {
  try {
    const allDisc = await discountModel.find().lean();
    return res.json(allDisc);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addDiscount = async (req, res) => {
  try {
    const result = await discountModel.create({
      name: req.body.name,
      disc: Number.parseFloat(req.body.disc),
      mode: req.body.mode === "false" ? false : true,
    });

    return res.json({ did: result._id });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const delDiscount = async (req, res) => {
  try {
    await discountModel.findByIdAndDelete(req.body.did).lean();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
