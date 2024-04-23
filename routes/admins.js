// Creating a 'users' module for hanlding routes for Users.

const express = require("express");
const router = express.Router();

// IMPORT MODULE FROM /controllers/adminController.js
const adminController = require("../controllers/adminController");

//////////-- TESTING STAGE -- //////////
// Get all users and render to allusers page
router.get("/allusers-admin", adminController.getAll);
// Route for finding one user by userID and rendering edem.handlebars
router.get("/edem-admin/:id", adminController.getAdminDetails);

router.post("/admins", adminController.verifyPassword);

///////////-- END OF TESTING -- //////////////

/////////// -- INSERT ROUTES HERE -- ///////////

// Render the homepage
// router.get("/", userController.getHome);
// // Render the booking page
// router.get("/booking", userController.getBookingPage);
// // Route for Thank you page
// router.get("/thank-you", userController.getThankYouPage);
// Route for the admin page
// router.get("/adminpage-admin", adminController.getAdminPage);

// // Route for the admin-crud-update page
// router.get("/admin-crud-update-admin/:id", adminController.getUpdatePage);

// // Route for deleting crud
// router.get("/delete-admin/:id", adminController.deleteAdmin);

// // Route for POST - CREATE ADMIN
// router.post("/users-admin", adminController.createAdmin);
// // Route for the POST to Update Admin
// router.post("/adminpage-admin", adminController.updateAdmin);

// // Route for deleting admin
// router.get("/delete-admin/:id", adminController.deleteAdmin);

// Export the router
module.exports = router;
