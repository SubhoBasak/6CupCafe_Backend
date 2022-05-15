import purchaseModel from "../models/purchaseModel.js";
import ingModel from "../models/ingModel.js";

export const newPurchase = async (req, res) => {
  try {
    let ing = await ingModel.findById(req.body.ing);
    if (!ing) return res.sendStatus(404);

    req.body.qnt = Number.parseFloat(req.body.qnt);
    ing.curStock += req.body.qnt;
    await ing.save();

    await purchaseModel.create({
      ing: ing._id,
      qnt: req.body.qnt,
      cost: req.body.cost,
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const delPurchase = async (req, res) => {
  try {
    const pc = await purchaseModel
      .findByIdAndDelete(req.body.pcid)
      .select("ing qnt")
      .lean();

    const ing = await ingModel.findById(pc.ing);
    ing.qnt -= pc.qnt;
    await ing.save();

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const ingPurchaseHistory = async (req, res) => {
  try {
    if (!(await ingModel.exists({ _id: req.query.iid }))) {
      await purchaseModel.deleteMany({ ing: req.query.iid });
      return res.sendStatus(404);
    }

    return res.json(
      await purchaseModel.find({ ing: req.query.iid }).sort({ _id: -1 }).lean()
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
