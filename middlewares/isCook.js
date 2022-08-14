const isCook = (req, res, next) => {
  // try {
  //   if (req.user.role === 2) next();
  //   else return res.sendStatus(405);
  // } catch (error) {
  //   console.log(error);
  //   return res.sendStatus(401);
  // }
  next();
};

export default isCook;
