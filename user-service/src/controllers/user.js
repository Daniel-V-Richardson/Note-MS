const express = require("express");
const User = require("../models/User");
const logger = require("../../../shared/logger");
const router = express.Router();

// Register a new user
const registerUser = async (req, res, next) => {
  try {
    logger.info("Register User Initiated");
    const body = req.body;
    let user = await User.create(body);
    // const token = User.generateAuthToken();
    res.status(201).send({ user });
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error: error.message });
  }
};

const loginUser = async (req, res, next) => {
  try {
    logger.info("Login User Initiated");
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      logger.warn("Invalid email or password");
      return res.status(400).send({ error: "Invalid email or password" });
    }
    await user.createUserDatabase();

    const token = user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    logger.error(`Error in loginUser: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
};

const getProfileDetails = async (req, res, next) => {
  logger.info("Fetching User Information");
  try {
    res.send(req.user);
  } catch (error) {
    logger.error(`Error in fetching user profile: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
};

const updateUserDetails = async (req, res, next) => {
  logger.info("Updating User Details");
  try {
    const { name, email, address, phoneNumber } = req.body;
    req.user.name = name;
    req.user.email = email;
    req.user.address = address;
    req.user.phoneNumber = phoneNumber;
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    logger.error(`Error in updating user details: ${error.message}`);
    res.status(400).send({ error: error.message });
  }
};

const logoutUser = async (req, res, next) => {
  logger.info("Logout User");
  try {
    // Optionally, perform any cleanup actions here
    // For token-based auth, you could invalidate the token here
    res.send({ message: "Logout successful" });
  } catch (error) {
    logger.error(`Error in logoutUser: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
};

const deleteUser = async (req, res, next) => {
  logger.info("Deleting User and Database");
  try {
    const userId = req.user._id;
    await User.findByIdAndDelete(userId);
    await User.deleteUserDatabase(req.user._id);

    res.send({ message: "User and associated data deleted successfully" });
  } catch (error) {
    logger.error(`Error in deleting user: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfileDetails,
  updateUserDetails,
  logoutUser,
  deleteUser,
};
