const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to the mongodb database
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURI);

// Import the User schema
const User = require("../models/User");

// Home Root
const getHome = (req, res) => {
  res.send("My MVC App HELLO");
};

// userDetails, get one user
const getUserDetails = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.send(user);
};
// // FIND ONE BY FIRSTNAME

// const getUserByFirstName = async (userFirstName) => {
//   const userFirstName = req.params.userFirstName;
//   const user = await User.findOne({ firstName: userFirstName });
//   res.json(user);
// };

// Find user by firstname function
const getUserByFirstName = async (userFirstName) => {
  try {
    const result = await User.findOne({ firstName: userFirstName });
    res.json(result);
  } catch (error) {
    console.log("Error");
  }
};

// getUserByFirstName("Edem");

// GET ALL ITEMS IN THE DATABASE
const getAll = async () => {
  try {
    const result = await User.find();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// getAll();

// Get all users details

// const getUserDetails = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await User.findById(id);
//     res.render("index", {
//       user: user.toJSON(),
//     });
//   } catch (err) {
//     res.status(404).json({ msg: "Not found" });
//   }
// };

module.exports = { getHome, getUserDetails, getUserByFirstName };
