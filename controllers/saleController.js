import customerModel from "../models/customerModel.js";
import productModel from "../models/productModel.js";
import saleModel from "../models/saleModel.js";

export const newSale = async (req, res) => {
  try {
    if (req.body.items.length < 1) return res.sendStatus(204);

    let cst = null;
    if (req.body.phone && req.body.cname) {
      cst = await customerModel.findOneAndUpdate(
        { phone: req.body.phone },
        { name: req.body.cname },
        { upsert: true, new: true }
      );

      if (req.body.note) {
        cst.note += req.body.note;
        await cst.save();
      }
    }

    const sale = new saleModel({
      payMethod: req.body.payMethod,
      orderType: req.body.orderType,
      customer: cst ? cst._id : null,
    });

    for (let i = 0; i < req.body.items.length; i++) {
      const prd = await productModel.findById(req.body.items[i].pid);
      if (!prd) continue;

      sale.items.push({ item: prd._id, quantity: req.body.items[i].qnt });
      sale.total += prd.price * req.body.items[i].qnt;
    }

    await sale.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getCurOrders = async (req, res) => {
  try {
    return res.json(
      await saleModel
        .find({ status: false })
        .select("items date")
        .populate([
          { path: "items.item", select: "name" },
          { path: "customer", select: "name phone" },
        ])
        .sort({ _id: -1 })
        .lean()
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
