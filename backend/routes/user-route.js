const express = require("express");
const mongoose = require("mongoose");
const { check } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// User signup
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
      transactions: [],
      stocks: []
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

// User login
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

// Get shortlisted stock
router.get("/getStock/:uid", async (req, res, next) =>{
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    const error = new Error("Getting user failed, please try again later.");
    return next(error);
  }

  if (!user) {
    console.log("User does not exist, please try again!");
    const error = new Error("User does not exist, please try again!");
    return next(error);
  }
  
  console.log("Retrieved stocks successfully!");
  res.status(201).json({ stocks: user.stocks });
})

// Add shortlisted stock
router.post("/addStock/:uid", async (req, res, next) => {
  const userId = req.params.uid;

  let newStock = req.body.stock;

  let userWithStocks;
  try {
    userWithStocks = await User.findById(userId).populate("stocks");
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Fetching stocks failed, please try again later."
    );
    return next(error);
  }

  if (!userWithStocks) {
    console.log("Could not find stocks for the userId.");
    const error = new Error("Could not find stocks for the userId.");
    return next(error);
  }

  if(userWithStocks.stocks.includes(newStock)) {
    console.log("Stock is already shortlisted!");
    const error = new Error("Stock is already shortlisted!");
    return next(error);
  }

  try {
    console.log(newStock);
    userWithStocks.stocks.push(newStock);
    await userWithStocks.save();
  } catch (err) {
    console.log(err);
    const error = new Error("Adding stock failed, please try again!");
    return next(error);
  }
  console.log("Stock added successfully!")
  res.status(201).json({ stocks: userWithStocks.stocks })
});

// delete shortlisted stock

router.delete("/deleteStock/:uid", async (req, res, next) => {
  const userId = req.params.uid;

  let deleteStock = req.body.stock;

  let userWithStocks;
  try {
    userWithStocks = await User.findById(userId).populate("stocks");
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Fetching stocks failed, please try again later."
    );
    return next(error);
  }

  if (!userWithStocks) {
    console.log("Could not find stocks for the userId.");
    const error = new Error("Could not find stocks for the userId.");
    return next(error);
  }

  if(!userWithStocks.stocks.includes(deleteStock)) {
    console.log("Stock is not within shortlist!");
    const error = new Error("Stock is not within shortlist!");
    return next(error);
  }

  try {
    console.log(deleteStock);
    userWithStocks.stocks.pull(deleteStock);
    await userWithStocks.save();
  } catch (err) {
    console.log(err);
    const error = new Error("Deleting stock failed, please try again!");
    return next(error);
  }
  console.log("Stock deleted successfully!")
  res.status(201).json({ stocks: userWithStocks.stocks })
});

// GET request to get monthly budget
router.get('/:uid/getBudget', async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);   
  } catch (err) {
    console.log(err);
    const error = new Error("Getting budget failed, please try again!");
    return next(error);
  }
  if (!user) {
    console.log("User does not exist, please try again!");
    const error = new Error("User does not exist, please try again!");
    return next(error);
  }
  console.log("Get budget successfully!");
  res.status(201).json({ monthlyBudget: user.monthlyBudget });
});

// PUT request to edit user budget
router.put('/:uid/editBudget', async (req, res, next) => {
  const userId = req.params.uid;
  const monthlyBudget = req.body.monthlyBudget;

  if (monthlyBudget < 0) {
    console.log("Monthly Budget should not be lesser than 0!");
    const error = new Error("Please enter a budget greater than 0");
    return next(error);
  }

  let user;
  try {
    // Find the user by userId
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    const error = new Error("Editting budget failed, please try again!");
    return next(error);
  }
  if (!user) {
    console.log("User does not exist, please try again!");
    const error = new Error("User does not exist, please try again!");
    return next(error);
  }
  try{
    user.monthlyBudget = monthlyBudget;
    await user.save();
  } catch (err) {
    console.log(err);
    const error = new Error("Editting budget failed, please try again!");
    return next(error);
  }
  console.log("Budget updated successfully!");
  res.status(201).json({ monthlyBudget: user.monthlyBudget });
});


module.exports = router;
