import express from "express";
const router = express.Router();
import Users from "../models/user.js";
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "ewefwegwrherhe";
import requireLogin from '../middleware/auth.js';

router.post("/signup", (req, res) => {
  const {
    name,
    password,
    email,
    url,
    hobby,
    phone,
    profession,
    fbUrl,
    instraUrl,
    linkedinUrl,
  } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  Users.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new Users({
          email,
          password: hashedpassword,
          name,
          image: url,
          hobby,
          phone,
          profession,
          fbUrl,
          instraUrl,
          linkedinUrl,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  Users.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const {
            _id,
            name,
            email,
            image,
            hobby,
            phone,
            profession,
          } = savedUser;
          res.json({
            token,
            user: {
              _id,
              name,
              email,
              image,
              hobby,
              phone,
              profession,
            },
          });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/profile", requireLogin, (req, res) => {
  Users.find({ name: req.user.name })
    .select("-password")
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
