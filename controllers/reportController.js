import productModel from "../models/productModel.js";
import saleModel from "../models/saleModel.js";

export const getFlatReport = async (req, res) => {
  try {
    const report = await saleModel
      .find({
        // date: { $gte: req.body.start, $lte: req.body.end },
      })
      .select("date total payMethod customer orderType delivery")
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
    const prods = await productModel.find().select("name").lean();
    const report = await saleModel
      .find({
        date: { $gte: req.body.start, $lte: req.body.end },
      })
      .select("items")
      .populate("items.item")
      .lean();

    report.items.map(data => {

    })

    return res.json(report);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
