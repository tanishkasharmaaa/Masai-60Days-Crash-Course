const logger = require("../logger");
const userModel = require("../models/user.model");

const adminCount = async (req, res, next) => {
  try {
    // Check if an admin already exists in the database
    let adminExists = await userModel.findOne({ role: "admin" });

    // If an admin already exists and the current request is trying to add another admin
    if (adminExists && req.body.role === "admin") {
      return res.status(400).send('There can only be one admin.');
    }

    // If no admin exists and the role is "admin", allow the creation of the new admin
    if (!adminExists && req.body.role === "admin") {
      // Continue to the next middleware or controller logic
      return next();
    }

    // If the role is not "admin", continue with the next middleware
    return next();
  } catch (error) {
   logger.error('Error checking admin count:', error);
    return res.status(500).send('Internal server error');
  }
};

module.exports = adminCount;
