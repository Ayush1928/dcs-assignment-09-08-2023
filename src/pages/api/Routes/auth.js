const express = require("express");
const router = express.Router();
const User = require("../Models/User");

//Register
router.post("/register", async (req, res) => {
  //Checking if the field contains only blank space
  console.log("Register called.")
  const fields = ["name", "phone", "email"];
  const containsOnlySpaces = fields.some((field) => !req.body[field].trim());

  if (containsOnlySpaces) {
    return res.status(400).json("Fields cannot contain only blank spaces.");
  }

  //Creating new user
  const newUser = new User({
    username: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });
    if (!user) {
      return res.status(401).json("This phone number is not linked with any account.");
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

module.exports = router;
