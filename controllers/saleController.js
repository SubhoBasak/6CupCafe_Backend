import customerModel from "../models/customerModel.js";
import deliveryModel from "../models/deliveryModel.js";
import productModel from "../models/productModel.js";
import prodIngModel from "../models/prodIngModel.js";
import saleModel from "../models/saleModel.js";
import ingModel from "../models/ingModel.js";
import taxModel from "../models/taxModel.js";

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

    if (req.body.orderType === 1) {
      const delv = await deliveryModel.findById(req.body.delv).lean();

      if (delv) sale.delivery = delv._id;
      else return res.sendStatus(404);

      sale.address = req.body.addr;
    }

    for (let i = 0; i < req.body.items.length; i++) {
      const prd = await productModel.findById(req.body.items[i].pid);
      if (!prd) continue;
      if (prd.stock < req.body.items[i].qnt) continue;
      else {
        prd.stock -= req.body.items[i].qnt;
        await prd.save();
      }

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
    let tax = 0;

    taxes.map((tax) => {
      tax += (sale.total * tax.tax) / 100;
    });
    sale.total += tax;

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
        .find({ orderType: 0, $or: [{ status: 0 }, { status: 1 }] })
        .select("_id items date status")
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

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await saleModel.findById(req.body.oid);
    if (!order) return res.sendStatus(404);

    order.status++;
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
