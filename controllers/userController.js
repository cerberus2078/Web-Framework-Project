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

// Admin Update Page
const getUpdatePage = async (req, res) => {
  try {
    const id = Number(req.params.id); // Parse string to integer
    // Validate the userID
    if (isNaN(id)) {
      throw new Error("Invalid user ID");
    }
    const user = await User.getOneUser(id);
    console.log(user);
    res.render("admin-crud-update", {
      title: "UpdatePage",
      user: user.toJSON(),
      //   users: user,
    });
  } catch (err) {
    res.status(404).json({
      msg: err.message || "Not found",
    });
  }
};

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

// Update User

// sumit (POST) the firstName to the database to update, later on needs to be changed to check-in and check-out dates
const updateUser = async (req, res) => {
  try {
    const { userID, firstName } = req.body;
    if (!userID) {
      return res.status(400).send("User ID (userID) is required");
    }
    // Update only the firstName field for the user with the given userID
    await User.updateOneUser({ userID }, { firstName });
    res.redirect("/adminpage");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// EXPORT MODULES
module.exports = {
  getHome,
  getAll,
  getUserDetails,
  getAdminPage,
  getUpdatePage,
  updateUser,
};
