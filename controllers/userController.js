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

// GET BOOKING PAGE
const getBookingPage = (req, res) => {
  //   res.send("INDEX PAGE SHOWING HERE WITH MVC");
  res.render("booking", {
    title: "Booking",
    companyName: "Sunny Side Sandcastle",
  });
};

// GET THANK YOU PAGE
const getThankYouPage = (req, res) => {
  res.render("thank-you", {
    title: "Thank You",
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
    // console.log(user);
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


// email
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')

// create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  secureConnection: false,
  auth: {
    user: 'noreplyssshotel@gmail.com',
    pass: 'itxn pdek taby ghbx '
  },
  tls: {rejectUnauthorized: true}
});

transporter.use('compile', hbs({
  viewEngine: {
      extname: '.handlebars',
      layoutsDir: '../views/',
      defaultLayout: false,
      partialsDir: '../views/',
  },
  viewPath: 'templates/',
  extName: '.handlebars'
}));


// CREATE USER
const createUser = async (req, res) => {
  try {
    const {
      userID,
      firstName,
      lastName,
      email,
      phoneNumber,
      checkIn,
      checkOut,
    } = req.body;

    console.log("Received user data:", req.body);

    // create new user
    await User.createNewUser({
      userID,
      firstName,
      lastName,
      email,
      phoneNumber,
      checkIn,
      checkOut,
    });

    console.log("User created successfully");

    // Send email to the user
    const mailOptions = {
      from: "noreplyssshotel@gmail.com",
      to: email,
      subject: "Room Reservation",
      template: "../views/booking-confirmation",
      context: {
        name: `${firstName} ${lastName}`,
        checkIn,
        checkOut
      },
      attachments: [{
        filename: 'logo2.png',
        path: "controllers\\logo2.png",
        cid: 'logo2'
      }]
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    // Redirect to the thank-you page
    return res.redirect("/thank-you");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("Error creating user");
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
const updateUser = async (req, res) => {
  try {
    const { userID, firstName, lastName, email, checkIn, checkOut } =
      req.body;
    if (!userID) {
      return res.status(400).send("User ID (userID) is required");
    }
    
    await User.updateOneUser(
      { userID },
      { firstName, lastName, email, checkIn, checkOut }
    );
    res.redirect("/adminpage");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.deleteOneUser(id);
    res.redirect("/adminpage");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to delete user");
  }
};


// EXPORT MODULES
module.exports = {
  getHome,
  getBookingPage,
  getThankYouPage,
  getAll,
  getUserDetails,
  getAdminPage,
  getUpdatePage,
  updateUser,
  deleteUser,
  createUser,
};
