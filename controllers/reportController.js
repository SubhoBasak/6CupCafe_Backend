import prodReportModel from "../models/prodReportModel.js";
import deliveryModel from "../models/deliveryModel.js";
import productModel from "../models/productModel.js";
import saleModel from "../models/saleModel.js";

export const getFlatReport = async (req, res) => {
  try {
    const report = await saleModel
      .find({
        date: {
          $gte: new Date(req.query.start),
          $lt: new Date(req.query.end),
        },
      })
      .select("total payMethod orderType delivery")
      .lean();

    // orderType
    // express billing
    let subOrders = report.filter((data) => data.orderType === 0);
    let ebCount = subOrders.length;
    let ebTotal = 0;
    subOrders.forEach((data) => (ebTotal += data.total));

    // home delivery
    subOrders = report.filter((data) => data.orderType === 1);
    let dlvCount = subOrders.length;
    let dlvTotal = 0;
    subOrders.forEach((data) => (dlvTotal += data.total));

    const allDlv = await deliveryModel.find().select("name").lean();
    let dlv = [];

    allDlv.forEach((data) => {
      let superSubOrders = subOrders.filter(
        (order) => order.delivery.toString() === data._id.toString()
      );
      let subTotal = 0;
      superSubOrders.forEach((order) => (subTotal += order.total));
      dlv.push({
        name: data.name,
        count: superSubOrders.length,
        total: subTotal,
      });
    });

    // payMethod
    // cash
    subOrders = report.filter((data) => data.payMethod === 0);
    let cashCount = subOrders.length;
    let cashTotal = 0;
    subOrders.forEach((data) => (cashTotal += data.total));

    // card
    subOrders = report.filter((data) => data.payMethod === 1);
    let cardCount = subOrders.length;
    let cardTotal = 0;
    subOrders.forEach((data) => (cardTotal += data.total));

    // upi
    subOrders = report.filter((data) => data.payMethod === 2);
    let upiCount = subOrders.length;
    let upiTotal = 0;
    subOrders.forEach((data) => (upiTotal += data.total));

    return res.json({
      ebCount,
      ebTotal,
      dlvCount,
      dlvTotal,
      cashCount,
      cashTotal,
      cardCount,
      cardTotal,
      upiCount,
      upiTotal,
      dlv,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getProductReport = async (req, res) => {
  try {
    const prod = await productModel.findById(req.query.pid);
    if (!prod) return res.sendStatus(404);

    const report = await prodReportModel
      .find({
        prod: prod._id,
        $and: [
          { year: { $gte: req.query.year }, month: { $gte: 3 } },
          { year: { $lte: req.query.year + 1 } },
        ],
      })
      .lean();

    return res.json(report);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
