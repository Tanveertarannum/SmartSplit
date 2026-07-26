const User = require("../models/User");

// ===========================
// Upload Avatar
// ===========================

const uploadAvatar = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    user.avatar = `/uploads/${req.file.filename}`;

    await user.save();

    res.json({
      message: "Avatar uploaded successfully",
      avatar: user.avatar,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ===========================
// Get User Profile
// ===========================

const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ===========================
// Update Profile
// ===========================

const updateProfile = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {

  uploadAvatar,
  getProfile,
  updateProfile,

};