// Creating a 'users' module for hanlding routes for Users.

const express = require("express");
const router = express.Router();

// IMPORT MODULE FROM /controllers/userController.js
const userController = require("../controllers/userController");

//////////-- TESTING STAGE -- //////////
// Get all users and render to allusers page
router.get("/allusers", userController.getAll);
// Route for finding one user by userID and rendering edem.handlebars
router.get("/edem/:id", userController.getUserDetails);

///////////-- END OF TESTING -- //////////////

/////////// -- INSERT ROUTES HERE -- ///////////

// Render the homepage
router.get("/", userController.getHome);
// Render the booking page
router.get("/booking", userController.getBookingPage);
// Route for room 1 page
router.get("/room1", userController.getRoom1Page);
// Route for room 2 page
router.get("/room2", userController.getRoom2Page);
// Route for Thank you page
// router.get("/thank-you", userController.getThankYouPage);
// Route for the admin login page
router.get("/adminLogin", userController.getAdminLoginPage);
// Route for the admin page
router.get("/adminpage", userController.getAdminPage);

// Route for the admin-crud-update page
router.get("/admin-crud-update/:id", userController.getUpdatePage);

// Route for deleting crud
router.get("/admin-crud-update/delete/:id", userController.deleteUser);

// Route for POST - CREATE USER
router.post("/users", userController.createUser);
// Route for the POST to Update User
router.post("/adminpage", userController.updateUser);

// Route for deleting user
router.get("/delete/:id", userController.deleteUser_User);

// Export the router
module.exports = router;
