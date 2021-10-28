import User from "../models/user.js";

export const me = async (req, res) => {
  User.find({ name: req.user.name })
    .select("-password")
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
};
