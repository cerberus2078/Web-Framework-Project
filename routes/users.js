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
// Route for the admin page
router.get("/adminpage", userController.getAdminPage);
// Route for the admin-crud-update page
router.get("/admin-crud-update/:id", userController.getUpdatePage);

// Route for the POST to Update User
router.post("/adminpage", userController.updateUser);
// router.post("/adminpage-updated/:id", userController.updateUsers);

// // sumit (POST) the firstName to the database to update, later on needs to be changed to check-in and check-out dates
// app.post("/adminpage", async (req, res) => {
//   try {
//     const { userID, firstName } = req.body;
//     if (!userID) {
//       return res.status(400).send("User ID (userID) is required");
//     }
//     // Update only the firstName field for the user with the given userID
//     await User.findOneAndUpdate({ userID }, { firstName });
//     res.redirect("/adminpage");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

// Export the router
module.exports = router;
