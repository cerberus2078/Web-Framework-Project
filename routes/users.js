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

// Route for the admin page
router.get("/adminpage", userController.getAdminPage);

///////////-- END OF TESTING -- //////////////

/////////// -- INSERT ROUTES HERE -- ///////////

// Render the homepage
router.get("/", userController.getHome);

// Export the router
module.exports = router;
