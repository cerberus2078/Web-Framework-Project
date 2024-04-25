// Creating a 'users' module for hanlding routes for Users.

const express = require("express");
const router = express.Router();

// IMPORT MODULE FROM /controllers/adminController.js
const adminController = require("../controllers/adminController");

/////////// -- INSERT ROUTES HERE -- ///////////

// Route for Admin Login
router.post("/admins", adminController.verifyPassword);

// Route for Admin SignUp
router.get("/admin-signup", adminController.getSignUpPage);
// router.post("/signup", adminController.createAdmin);
router.post(
  "/signup",
  adminController.createAdminValidationRules,
  //   adminController.validate,
  adminController.createAdmin
);

// Export the router
module.exports = router;
