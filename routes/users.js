// Creating a 'users' module for hanlding routes for Users.

const express = require("express");
const router = express.Router();

// IMPORT MODULE FROM /controllers/userController.js
const userController = require("../controllers/userController");

// Render the homepage
router.get("/", userController.getHome);

// Route for finding one user by userID and rendering edem.handlebars
router.get("/edem/:id", userController.getUserDetails);

// Export the router
module.exports = router;
