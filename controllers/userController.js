// All necessary imports

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to the mongodb database
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURI);

// Import the User schema
// const User = require("../models/User"); // MAYBE DELETE LATER
const User = require("../models/User"); // MAYBE DELETE LATER

// FUNCTIONS FOR ALL THE ROUTES in route/users.js

// HOME ROOT
const getHome = (req, res) => {
  //   res.send("INDEX PAGE SHOWING HERE WITH MVC");
  res.render("index", {
    title: "Home",
    companyName: "Sunny Side Sandcastle",
  });
};

// GET ADMIN
const getAdminPage = async (req, res) => {
  try {
    const allUsers = await User.getAllUsers();
    res.render("admin", {
      title: "Admin",
      companyName: "Sunny Side Sandcastle",
      users: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// // render the admin page
// router.get("/adminpage", async (req, res) => {
//   try {
//     // added .lean() after User.find, and {} inside the User.find()
//     // .lean() returns the JavaScript object instead of Mongoose document
//     // https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
//     const users = await User.find({}).lean();
//     // console.log("Fetched users:", users); // check if it reads the user data, debugging
//     res.render("admin", {
//       users: users,
//       title: "Admin",
//       companyName: "Sunny Side Sandcastle",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// });

// GET ALL USERS
const getAll = async (req, res) => {
  try {
    const allUsers = await User.getAllUsers();
    console.log(allUsers);
    res.render("allusers", {
      products: allUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

// userDetails

const getUserDetails = async (req, res) => {
  try {
    const id = Number(req.params.id); // Parse string to integer
    // Validate the userID
    if (isNaN(id)) {
      throw new Error("Invalid user ID");
    }
    const user = await User.getOneUser(id);
    res.render("edem", {
      users: user.toJSON(),
    });
  } catch (err) {
    res.status(404).json({
      msg: err.message || "Not found",
    });
  }
};

// EXPORT MODULES
module.exports = { getHome, getAll, getUserDetails, getAdminPage };
