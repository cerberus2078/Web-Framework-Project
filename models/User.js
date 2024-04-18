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

// To use the schema, use 'User' with the uppercase
const User = mongoose.model("User", userSchema);

router.get('/adminpage', (req, res) => {
  res.render('admin-crud-update', {
    title: "Admin Edit Page"
  });
});

router.post('/adminpage', (req, res) => {
  if (req.body._id == "") {
    createUser(req, res);
  } else {
    updateUser(req, res);
  }
});

// Create function
function createUser(req, res) {
  var user = new User();
  user.userID = req.body.userID;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.phoneNumber = req.body.phoneNumber;

  user.save((err, doc) => {
    if (!err) {
      res.redirect('/adminpage');
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render('admin-crud-update', {
          title: "Admin Edit Page",
          user: req.body
        });
      }
      console.log(err);
    }
  });
}

// Update function
function updateUser(req, res) {
  User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
    if (!err) {
      res.redirect('/adminpage');
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("admin-crud-update", {
          user: req.body
        });
      } else {
        console.log(err);
      }
    }
  });
}

// Read
router.get('/adminpage', (req, res) => {
  User.find((err, docs) => {
    if (!err) {
      res.render("admin", {
        users: docs // Corrected variable name
      });
    }
  });
});

// Update
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("admin-crud-update", {
        title: "update",
        user: doc // Corrected variable name
      });
    }
  });
});

// Delete
router.get('/delete/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, doc) => { // Corrected parameter name
    if (!err) {
      res.redirect('/adminpage');
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
module.exports = User;
