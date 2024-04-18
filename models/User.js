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
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  }
});

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
router.post('/adminpage', (req, res) => {
  if (req.body.userID == "") {
    createUser(req, res);
  } else {
    updateUser(req, res);
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
      res.status(500).send("Server Error");
    }
  });
}

// update function
function updateUser(req, res) {
  User.findOneAndUpdate({ userID: req.body.userID }, req.body, { new: true }, (err, user) => {
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
        }
    }
  });
}

// delete user with the id
router.get('/admin-crud-update/delete/:id', (req, res) => {
    const id = req.params.id; // Corrected from req.params.userID to req.params.id
    User.findOneAndDelete({ userID: id }, (err, user) => {
        if (!err) {
            res.redirect('/adminpage');
        } else {
            console.error(err);
            res.status(500).send("Server Error");
        }
    });
});

module.exports = router;
module.exports = User;
