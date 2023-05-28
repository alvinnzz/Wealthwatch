const express = require("express");
const { check } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  // email is unique and check if email is in database
  let check;
  try {
    check = await User.findOne({ email: req.body.email });
  } catch (err) {
    console.log(err);
    res.status(403).json("Signup failed");
  }
  if (check) {
    console.log("Email is taken. Please try another email.");
    return res.status(403).json("Sign up failed: Email taken");
  } else {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      console.log(err);
      res.status(403).json("Signup failed");
    }
    const createdUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    try {
      const result = await createdUser.save();
      console.log("User saved into database");
    } catch (err) {
      console.log(err);
    }
    console.log("Signed up successfully!");
    res.status(201).json(createdUser);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  let check;
  try {
    check = await User.findOne({ email: req.body.email });
  } catch (err) {
    console.log(err);
    res.status(403).json("Login failed");
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, check.password);
  } catch (err) {
    console.log(err);
    res.status(403).json("Login failed");
  }
  if (!check) {
    console.log("Login failed: Email not found. Please try again.");
    res.status(404).json("Email not found");
  } else if (!isValidPassword) {
    console.log("Login failed: Wrong Password. Please try again.");
    res.status(401).json("Wrong Password!");
  } else {
    console.log("Login Successfully!");
    res.status(201).json("Login Successfully!");
  }
});

module.exports = router;
