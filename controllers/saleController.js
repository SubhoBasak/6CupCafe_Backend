import customerModel from "../models/customerModel.js";
import productModel from "../models/productModel.js";
import saleModel from "../models/saleModel.js";

export const newSale = async (req, res) => {
  try {
    const cst = new customerModel.findOneAndUpdate(
      { phone: req.body.phone },
      { name: req.body.cname },
      { upsert: true, new: true }
    );

    const sale = new saleModel({
      payMethod: req.body.payMethod,
      customer: cst._id,
    });

    for (let i = 0; i < req.body.prds.length; i++) {
      const prd = await productModel.findById(req.body.prds[i].prd._id);
      if (!prd) continue;

      sale.items.push({ item: prd._id, quantity: req.body.prds[i].qnt });
      sale.total += prd.price * req.body.prds[i].qnt;
    }

    switch (req.body.payMethod) {
      case 0: {
        cst.cashMode++;
        break;
      }
      case 1: {
        cst.cardMode++;
        break;
      }
      case 2: {
        cst.upiMode++;
        break;
      }
    }
    cst.expressBilling++;
    cst.expressTotal += total;

    await cst.save();
    await sale.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
