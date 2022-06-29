import completeModel from "../models/completeModel.js";
import tokenModel from "../models/tokenModel.js";

// initial the token
async function initToken() {
  const token = await tokenModel.findOne();
  if (!token) {
    await tokenModel.create({ start: 1 });
  }
}

initToken();

export const curToken = async (req, res) => {
  try {
    const token = await tokenModel.findOne();
    return res.json({ start: token.start });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const resetToken = async (req, res) => {
  try {
    const token = await tokenModel.findOne();
    token.start = req.body.start;
    await token.save();

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const openTokens = async (req, res) => {
  try {
    const token = await completeModel.find().sort({ _id: -1 }).limit();
    return res.json(token);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
