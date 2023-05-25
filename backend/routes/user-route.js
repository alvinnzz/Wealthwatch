const express = require('express')
const {check} = require('express-validator')
const User = require('../models/user')

const router = express.Router();


router.post('/signup', async (req, res, next) => {
  const {username, email, password} = req.body
  // email is unique and check if email is in database
  const check = await User.findOne({email:req.body.email})
  
  if (check) {
    console.log("Email is taken. Please try another email.");
    return res.status(403).send("signup failed: email taken");
  } else {
    const createdUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    try {
      const result = await createdUser.save();
      console.log("User saved into database")
    } catch (err) {
      console.log(err);
    }
    console.log("Signed up successfully!");
    res.status(201).json(createdUser);
  }    
});
   

router.post('/login', async (req, res, next) =>{
  const {email, password } = req.body;
  try {
    const check = await User.findOne({email:email});
  } catch (err){
    console.log(err);
  }
  if (!check) {
      console.log("Login failed: Email not found. Please try again.");
      res.status(404).send("Email not found");
  } else if (check.password !== password) {
      console.log("Login failed: Wrong Password. Please try again.");
      res.status(401).send("Wrong Password!");
  } else {
      console.log("Login Successfully!");
      res.status(201).send("Login Successfully!");
  }
});

module.exports = router;