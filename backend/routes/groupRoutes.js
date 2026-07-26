const express = require("express");

const {
  createGroup,
  getGroups,
} = require("../controllers/groupController");

const router = express.Router();

router.get("/", getGroups);

router.post("/", createGroup);

module.exports = router;