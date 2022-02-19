const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const addNewUser = async (req, res) => {
  try {
    let { firstName, lastName, matricule, role, password } = req.body;
    let hash = await bcrypt.hash(password, 10);
    if (!req.file) {
      let newUser = new User({
        firstName: firstName,
        lastName: lastName,
        password: hash,
        matricule: matricule,
        role: role,
        isActive: true
      });
      let result = await newUser.save();
      res.status(200).json({
        succes: true,
        message: "User created "
      });
    } else {
      let newUser = new User({
        firstName: firstName,
        lastName: lastName,
        password: hash,
        matricule: matricule,
        role: role,
        isActive: true,
        profileImage: req.file.path
      });
      let result = await newUser.save();
      res.status(200).json({
        succes: true,
        message: "User created "
      });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    let { matricule, password } = req.body;
    let user = await User.findOne({ matricule: matricule });
    if (!user) {
      res.status(401).json({
        succes: false,
        message: "wrong email or password"
      });
    } else {
      let verif = await bcrypt.compare(password, user.password);
      if (!verif) {
        res.status(401).json({
          succes: false,
          message: "wrong email or password"
        });
      } else {
        let token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY, {
          expiresIn: "2 days"
        });
        res.status(401).json({
          succes: true,
          user: {
            token: token,
            id: user._id,
            role: user.role
          }
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    let result = await User.find().select("-password -profileImage");
    res.status(200).json({
      succes: true,
      result: result
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const dataToUpdate = req.body;
    let { id } = req.params;
    const { ...updateData } = dataToUpdate;
    const result = await User.findByIdAndUpdate(id, updateData, {
      new: true
    }).select("-password");
    res.status(200).json({
      succes: true,
      message: "User Updated "
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    let result = await User.findOneAndDelete(id);
    res.status(200).json({
      succes: true,
      message: "User Deleted."
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message
    });
  }
};
module.exports = {
  loginUser,
  addNewUser,
  getAllUsers,
  updateUser,
  deleteUser
};
