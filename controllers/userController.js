// All necessary imports

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// Connect to the mongodb database
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURI);

// Import the User schema
const User = require("../models/User");

// FUNCTIONS FOR ALL THE ROUTES in route/users.js

// HOME ROOT
const getHome = (req, res) => {
  res.send("INDEX PAGE SHOWING HERE WITH MVC");
};

// userDetails
const getUserDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ userID: id });
    res.render("edem", {
      users: user.toJSON(),
    });
  } catch (err) {
    res.status(404).json({
      msg: "Not found",
    });
  }
};

// listAllUsers

// EXPORT MODULES
module.exports = { getHome, getUserDetails };
