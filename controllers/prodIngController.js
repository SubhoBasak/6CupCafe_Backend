import prodIngModel from "../models/prodIngModel.js";
import productModel from "../models/productModel.js";
import ingModel from "../models/ingModel.js";

export const addProdIng = async (req, res) => {
  try {
    const prod = await productModel.findById(req.body.pid);
    if (!prod) return res.sendStatus(404);

    const ing = await ingModel.findById(req.body.iid);
    if (!ing) return res.sendStatus(404);

    let prodIng = await prodIngModel.findOne({ prod: prod._id, ing: ing._id });
    if (prodIng) return res.sendStatus(409);

    const ping = await prodIngModel.create({
      prod: prod._id,
      ing: ing._id,
      qnt: Number.parseFloat(req.body.qnt),
    });

    return res.json({ ping: ping._id, name: ing.name, unit: ing.unit });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const delProdIng = async (req, res) => {
  try {
    await prodIngModel.findByIdAndDelete(req.body.ping);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
