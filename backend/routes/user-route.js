const express = require("express");
const { check } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  // email is unique and check if email is in database
  let check;
  try {
    check = await User.findOne({ email: req.body.email });
  } catch (err) {
    console.log(err);
    const error = new Error("Sign up failed, please try again later!");
    return next(error);
  }
  if (check) {
    console.log("Email is taken. Please try another email.");
    const error = new Error("Sign up failed: Email taken")
    return next(error);
  } else {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      console.log(err);
      const error = new Error("Sign up failed, please try again later!");
      return next(error);
    }
    const createdUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      transactions: []
    });
    try {
      const result = await createdUser.save();
      console.log("User saved into database");
    } catch (err) {
      console.log(err);
      const error = new Error("Sign up failed, please try again later!");
      return next(error);
    }

    let token;
    try{
      token = jwt.sign(
        { userId: createdUser.id, email: createdUser.email },
        "wealthwatch"
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Sign up failed, please try again later!");
      return next(error);
    }

    console.log("Signed up successfully!");
    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token});
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: req.body.email });
  } catch (err) {
    console.log(err);
    const error = new Error("Login failed, please try again later!")
    return next(error);
  }

  if (!existingUser) {
    console.log("Login failed: Email not found. Please try again.");
    const error = new Error("Login failed: Email not found!");
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    console.log(err);
    const error = new Error("Login failed, please try again later!")
    return next(error);
  }

  if (!isValidPassword) {
    console.log("Login failed: Wrong Password. Please try again.");
    const error = new Error("Login failed: Wrong Password!");
    return next(error);
  } else {
    let token;
    try{
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        "wealthwatch"
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Login failed, please try again later!");
      return next(error);
      // logging in failed
    }

    console.log("Login Successfully!");
    res.status(201).json({
      userId: existingUser.id,
      email: existingUser.email,
      token: token
    });
  }
});

module.exports = router;
