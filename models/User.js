// this is the file that contains User schema and User controller
const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

const userSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false, // changed to false for update CRUD
  },
  email: {
    type: String,
    required: false, // changed to false for update CRUD
  },
  phoneNumber: {
    type: String,
    required: false, // changed to false for update CRUD
  },
  checkIn: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
    required: true,
  },
});

// To-Do: we could add email validation: if the email has "@" -> email is valid
// if the email does not have "@" -> email is invalid

// to use the schema, use 'User' with the uppercase
const User = mongoose.model("User", userSchema);

// read all users and send them to admin page
router.get('/adminpage', (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
    } else {
      res.render('admin', {
        title: "Admin Page",
        users: users
      });
    }
  });
});

// read one user by id updated - working
router.get('/admin-crud-update/:id', (req,res) => {
    User.findById(req.params.userID, (err,user) => {
        if(!err && user){
            res.render('admin-crud-update',{
                title: "Update User",
                user: user
            });
        } else {
            console.error(err);
            res.status(404).send("User not found");
        }
    });
});

// call functions create user and update user
// To-Do: userID auto increment when creating a user

// maybe this could help:

// const newId = users[users.length -1].userID + 1;
// const newUser = {userID : newId}

router.post('/adminpage', (req, res) => {
  if (req.body.userID == "") {
    createUser(req, res);
    console.log(req.body); // debugging
  } else {
    updateUser(req, res);
    console.log(req.body); // debugging
  }
});

// create a user function
function createUser(req, res) {
  var user = new User({
    userID: req.body.userID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  });

  user.save((err, doc) => {
    if (!err) {
      res.redirect('/adminpage');
    } else {
      console.error(err);
      res.status(500).send("Server Error: Failed to create user");
    }
  });
}

// update function
function updateUser(req, res) {
  const updateFields = {firstName: req.body.firstName}
  User.findOneAndUpdate({ userID: req.body.userID }, updateFields, { new: true }, (err, user) => {
    if (!err) {
      res.redirect('/adminpage');
    } else {
        if(err.name == "ValidationError"){
            handleValidationError(err,req.body);
            res.render("admin-crud-update", {
                title: "Update User",
                user: req.body
            });
        }else{
            console.error(err);
            res.status(500).send("Server Error");
        }
    }
  });
}

// delete user with the id
router.get('/admin-crud-update/delete/:id', async (req, res) => {
  try {
      const deletedUser = await User.findOneAndDelete({ userID: req.body.userID });
      if (deletedUser) {
          res.redirect('/adminpage');
          console.log("User was deleted");
      } else {
          console.log("User not found");
          res.status(404).send("User not found, " + err);
      }
  } catch (err) {
      console.error(err);
      res.status(500).send("Server Error" + err);
  }
});



module.exports = router;
module.exports = User;
