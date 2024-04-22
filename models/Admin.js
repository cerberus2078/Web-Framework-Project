const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminID: {
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
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

// Database Functions Here (CRUD)

// CREATE ONE BY adminID FUNCTION

const createNewAdmin = (adminData) => {
  try {
    const newAdmin = new Admin(adminData);
    newAdmin.save();
  } catch (error) {
    console.log(error);
  }
};

// GET ALL ITEMS IN THE DATABASE
const getAllAdmins = async () => {
  try {
    const admins = await Admin.find().lean();
    return admins;
  } catch (error) {
    console.log(error);
  }
};

// READ ONE BY adminID FUNCTION
const getOneAdmin = async (id) => {
  try {
    const admin = await Admin.findOne({ adminID: id });
    return admin;
  } catch (error) {
    console.log(error);
  }
};

// UPDATE ONE BY adminID function
const updateOneAdmin = async (id, updateData) => {
  try {
    const updatedAdmin = await Admin.findOneAndUpdate(id, updateData, {
      new: true,
    });
  } catch (error) {
    console.error(error);
  }
};

// DELETE ONE BY adminID FUNCTION
const deleteOneAdmin = async (id) => {
  try {
    const deletedAdmin = await Admin.findOneAndDelete({ adminID: id });
  } catch (err) {
    console.log(err);
  }
};

// Export
module.exports = {
  createNewAdmin,
  getAllAdmins,
  getOneAdmin,
  updateOneAdmin,
  deleteOneAdmin,
};
