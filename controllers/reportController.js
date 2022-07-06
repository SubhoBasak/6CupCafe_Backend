import saleModel from "../models/saleModel.js";

export const getFlatReport = async (req, res) => {
  try {
    const report = await saleModel
      .find({
        // date: { $gte: req.body.start, $lte: req.body.end },
      })
      .select("date total payMethod customer orderType delivery items")
      .populate("customer")
      .lean();

    return res.json(report);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getProductReport = async (req, res) => {
  try {
    const report = await saleModel
      .find({
        date: { $gte: req.body.start, $lte: req.body.end },
      })
      .select("items");

    // TODO: COMPLETE THE LOGIC

    return res.json(report);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
