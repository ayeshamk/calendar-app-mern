import * as jwt from "jsonwebtoken";
import Users from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "ewefwegwrherhe";
console.log('---', JWT_SECRET);

export default (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const { _id } = payload;
    Users.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
