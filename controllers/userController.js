import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

userModel
  .findOneAndUpdate(
    { email: "admin@email.com" },
    { email: "admin@email.com", name: "Admin", role: 0, password: "ankush" },
    { upsert: true, new: true }
  )
  .then(() => console.log("Default admin created"));

export const login = async (req, res) => {
  try {
    let user = await userModel
      .findOne({
        email: req.body.email,
        password: req.body.password,
      })
      .lean();

    if (!user) return res.sendStatus(401);

    return res.json({
      token: jwt.sign({ id: user._id, role: user.role }, process.env.AUTH_KEY),
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    return req.sendStatus(500);
  }
};

export const allEmployee = async (req, res) => {
  try {
    return res.json(
      await userModel.find().select("name email role").sort({ _id: -1 }).lean()
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addEmployee = async (req, res) => {
  try {
    if (await userModel.exists({ email: req.body.email }))
      return res.sendStatus(409);

    await userModel.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      role: req.body.role,
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const delEmployee = async (req, res) => {
  try {
    await userModel.findOneAndDelete({ email: req.body.email });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const editEmployee = async (req, res) => {
  try {
    if (req.body.password)
      await userModel.findByIdAndUpdate(req.body.eid, {
        email: req.body.email,
        name: req.body.name,
        role: req.body.role,
        password: req.body.password,
      });
    else
      await userModel.findByIdAndUpdate(req.body.eid, {
        email: req.body.email,
        name: req.body.name,
        role: req.body.role,
      });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
