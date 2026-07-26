const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  uploadAvatar,
  getProfile,
  updateProfile,
} = require("../controllers/userController");

// Get Profile
router.get(
  "/:id",
  getProfile
);

// Update Profile
router.put(
  "/:id",
  updateProfile
);

// Upload Avatar
router.post(
  "/upload/:id",
  upload.single("avatar"),
  uploadAvatar
);

module.exports = router;