// All necessary imports

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Import express validator
const { body, validationResult } = require("express-validator");

// Connect to the mongodb database
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURI);

// Import the Admin schema
const Admin = require("../models/Admin"); // MAYBE DELETE LATER

// FUNCTIONS FOR ALL THE ROUTES in route/admins.js

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
const createAdmin_OLD = async (req, res) => {
  try {
    const { adminID, firstName, lastName, email, password } = req.body;
    await Admin.createNewAdmin({
      adminID,
      firstName,
      lastName,
      email,
      password,
    });
    res.redirect("/adminLogin");
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
    if (admin && email === admin.email && password === admin.password) {
      res.redirect("/adminpage");
    } else {
      res.render("adminLogin", {
        title: "Login Fail",
        loginCheck: "Password/ email was wrong, try again",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Get sign up page
const getSignUpPage = async (req, res) => {
  res.render("admin-signup", {
    title: "SignUp Admin",
  });
};

// // Express Validator
// const { body, validationResult } = require("express-validator");

// CREATE THE Validation rules
const createAdminValidationRules = [
  body("adminID").isInt().withMessage("Admin ID must be an integer").toInt(),
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name must not be empty"),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name must not be empty"),
  body("email").trim().isEmail().withMessage("Invalid email address"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// CREATE ADMIN AND VALIDATE INPUT
const createAdmin = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, render the form again with the errors

    // Create an object to be sent into rendered webpage.
    const errorsObj = errors.errors.reduce((obj, error) => {
      obj[error.path] = { value: error.value, msg: error.msg };
      return obj;
    }, {});
    return res.render("admin-signup", {
      title: "Sign-up Error",
      errors: errorsObj,
    });
  }

  //  Finally create the admin when there are no errors
  try {
    const { adminID, firstName, lastName, email, password } = await req.body;
    Admin.createNewAdmin({
      adminID,
      firstName,
      lastName,
      email,
      password,
    });
    res.redirect("/adminLogin"); // Redirect to login page after successful creation
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating admin");
  }
};

// EXPORT MODULES
module.exports = {
  getAll,
  getAdminDetails,
  getAdminPage,
  getUpdatePage,
  updateAdmin,
  deletedAdmin,
  createAdmin,
  verifyPassword,
  getSignUpPage,
  createAdminValidationRules,
};
