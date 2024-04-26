// Creating a 'admins' module for hanlding routes for Admins.

const express = require("express");
const router = express.Router();

// IMPORT MODULE FROM /controllers/adminController.js
const adminController = require("../controllers/adminController");

/////////// -- INSERT ROUTES HERE -- ///////////

// Route for Admin Login
router.post("/admins", adminController.verifyPassword);

// Route for Admin SignUp
router.get("/admin-signup", adminController.getSignUpPage);

// Route for creating and validating the Admin after signing up
router.post(
  "/signup",
  adminController.createAdminValidationRules,
  adminController.createAdmin
);

// Export the router
module.exports = router;
