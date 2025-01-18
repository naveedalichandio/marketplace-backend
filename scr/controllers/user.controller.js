const User = require("../models").User;
// Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "walletAddress", "createdAt"], // Specify fields to return
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving users.",
      error: error.message,
    });
  }
};

// Retrieve a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "walletAddress", "createdAt"],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the user.",
      error: error.message,
    });
  }
};

// Update a user's details
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, walletAddress } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Update fields if provided
    await user.update({
      name: name || user.name,
      email: email || user.email,
      walletAddress: walletAddress || user.walletAddress,
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Email or wallet address already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "An error occurred while updating the user.",
      error: error.message,
    });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user.",
      error: error.message,
    });
  }
};
