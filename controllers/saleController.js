import customerModel from "../models/customerModel.js";
import deliveryModel from "../models/deliveryModel.js";
import productModel from "../models/productModel.js";
import prodIngModel from "../models/prodIngModel.js";
import saleModel from "../models/saleModel.js";
import ingModel from "../models/ingModel.js";
import taxModel from "../models/taxModel.js";
import tokenModel from "../models/tokenModel.js";
import completeModel from "../models/completeModel.js";
import prodReportModel from "../models/prodReportModel.js";
import discountModel from "../models/discountModel.js";

export const newSale = async (req, res) => {
  try {
    if (req.body.items.length < 1) return res.sendStatus(204);

    let cst = null;
    let token = null;

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

    if (req.body.orderType === 1) {
      const delv = await deliveryModel.findById(req.body.delv).lean();

      if (delv) sale.delivery = delv._id;
      else return res.sendStatus(404);

      sale.address = req.body.addr;
    } else {
      token = await tokenModel.findOne();
      sale.token = token.start;
    }

    for (let i = 0; i < req.body.items.length; i++) {
      const prd = await productModel.findById(req.body.items[i].pid);
      if (!prd) continue;
      if (prd.stock < req.body.items[i].qnt) continue;
      else {
        prd.stock -= req.body.items[i].qnt;
        await prd.save();
      }

      const TODAY = new Date();
      let report = await prodReportModel.findOne({
        year: TODAY.getFullYear(),
        month: TODAY.getMonth(),
        prod: prd._id,
      });

      if (!report) {
        report = new prodReportModel({
          year: TODAY.getFullYear(),
          month: TODAY.getMonth(),
          prod: prd._id,
          count: 0,
        });
      }

      report.count += req.body.items[i].qnt;
      await report.save();

      sale.items.push({ item: prd._id, quantity: req.body.items[i].qnt });
      sale.total += prd.price * req.body.items[i].qnt;

      const ings = await prodIngModel.find({ prod: prd._id }).lean();
      for (let j = 0; j < ings.length; j++) {
        const ing = await ingModel.findById(ings[j].ing);

        if (!ing) await prodIngModel.findByIdAndDelete(ings[j].ing).lean();
        else {
          ing.curStock -= ings[j].qnt;
          await ing.save();
        }
      }
    }

    const taxes = await taxModel.find();
    let totalTax = 0;

    taxes.map((tax) => {
      totalTax += (sale.total * tax.tax) / 100;
    });
    sale.total += totalTax;

    if (req.body.disc) {
      const selDisc = await discountModel.findById(req.body.disc);
      if (selDisc)
        if (selDisc.mode)
          sale.total = (sale.total * (100 - selDisc.disc)) / 100;
        else sale.total -= selDisc.disc;
    }

    await sale.save();
    if (token) {
      token.start += 1;
      await token.save();
    }

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
        .find({ orderType: 0, $or: [{ status: 0 }, { status: 1 }] })
        .select("_id items date status token")
        .populate([
          { path: "items.item", select: "name" },
          { path: "customer", select: "name phone" },
        ])
        .lean()
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await saleModel.findById(req.body.oid);
    if (!order) return res.sendStatus(404);

    order.status++;
    if (order.status === 1) await completeModel.create({ token: order.token });
    else if (order.status === 2)
      await completeModel.findOneAndDelete({ token: order.token });

    await order.save();

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getCstOrders = async (req, res) => {
  try {
    return res.json(
      await saleModel
        .find({ customer: req.query.cid })
        .select("date payMethod orderType delivery total")
        .populate("delivery", "name")
        .lean()
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const lastOrders = async (req, res) => {
  try {
    const orders = await saleModel
      .find()
      .select("_id items date status token")
      .populate([
        { path: "items.item", select: "name" },
        { path: "customer", select: "name phone" },
      ])
      .limit(100);
    return res.json(orders);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
