import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  try {
    let user = jwt.verify(req.headers.authorization, process.env.AUTH_KEY);
    user = await userModel.findById(user.id);

    if (!user) return res.sendStatus(404);

    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};

export default authUser;
