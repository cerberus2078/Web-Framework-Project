// All necessary imports

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to the mongodb database
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURI);

// Import the Admin schema
const Admin = require("../models/Admin"); // MAYBE DELETE LATER

// FUNCTIONS FOR ALL THE ROUTES in route/admins.js

// // HOME ROOT
// const getHome = (req, res) => {
//   //   res.send("INDEX PAGE SHOWING HERE WITH MVC");
//   res.render("index", {
//     title: "Home",
//     companyName: "Sunny Side Sandcastle",
//   });
// };

// // GET BOOKING PAGE
// const getBookingPage = (req, res) => {
//   //   res.send("INDEX PAGE SHOWING HERE WITH MVC");
//   res.render("booking", {
//     title: "Booking",
//     companyName: "Sunny Side Sandcastle",
//   });
// };

// // GET THANK YOU PAGE
// const getThankYouPage = (req, res) => {
//   res.render("thank-you", {
//     title: "Thank You",
//     companyName: "Sunny Side Sandcastle",
//   });
// };

// GET ADMIN
const getAdminPage = async (req, res) => {
  try {
    const allAdmins = await Admin.getAllAdmins();
    res.render("admin", {
      title: "Admin",
      companyName: "Sunny Side Sandcastle",
      products: allAdmins,
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
    // Validate the adminID
    if (isNaN(id)) {
      throw new Error("Invalid admin ID");
    }
    const admin = await Admin.getOneAdmin(id);
    // console.log(admin);
    res.render("admin-crud-update", {
      title: "UpdatePage",
      products: admin.toJSON(),
    });
  } catch (err) {
    res.status(404).json({
      msg: err.message || "Not found",
    });
  }
};

// CREATE Admin
const createAdmin = async (req, res) => {
  try {
    const { adminID, firstName, lastName, email, password } = req.body;
    await Admin.createNewAdmin({
      adminID,
      firstName,
      lastName,
      email,
      password,
    });
    res.redirect("/adminpage");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating admin");
  }
};

// GET ALL ADMINS
const getAll = async (req, res) => {
  try {
    const allAdmins = await Admin.getAllAdmins();
    console.log(allAdmins);
    res.render("edem", {
      products: allAdmins,
    });
  } catch (error) {
    console.log(error);
  }
};

// adminDetails

const getAdminDetails = async (req, res) => {
  try {
    const id = Number(req.params.id); // Parse string to integer
    // Validate the adminID
    if (isNaN(id)) {
      throw new Error("Invalid admin ID");
    }
    const admin = await Admin.getOneAdmin(id);
    res.render("edem", {
      products: admin.toJSON(),
    });
  } catch (err) {
    res.status(404).json({
      msg: err.message || "Not found",
    });
  }
};

// Update Admin

// submit (POST) the firstName to the database to update, later on needs to be changed to check-in and check-out dates
const updateAdmin = async (req, res) => {
  try {
    const { adminID, firstName, lastName, email, password } = req.body;
    if (!adminID) {
      return res.status(400).send("Admin ID (adminID) is required");
    }
    // Update fields for the admin with the given adminID
    await Admin.updateOneAdmin(
      { adminID },
      { firstName, lastName, email, password }
    );
    res.redirect("/adminpage");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Delete admin
const deletedAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedAdmin = await Admin.deleteOneAdmin(id);
    res.redirect("/adminpage");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to delete admin");
  }
};

// Verify password
const verifyPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.getOneAdminEmail(email);
    console.log(email);
    // console.log(admin);
    // res.render("edem", { products: admin });
  } catch (error) {
    console.log(error);
  }
};

// EXPORT MODULES
module.exports = {
  //   getHome,
  //   getBookingPage,
  //   getThankYouPage,
  getAll,
  getAdminDetails,
  getAdminPage,
  getUpdatePage,
  updateAdmin,
  deletedAdmin,
  createAdmin,
  verifyPassword,
};
