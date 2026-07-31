const Group = require("../models/Group");
const Expense = require("../models/Expense");
const createGroup = async (req, res) => {
  try {
    console.log("BODY =>", req.body);

    const group = await Group.create({
      name: req.body.name,
      budget: req.body.budget,
      members: req.body.members,
      owner: req.body.owner,
    });

    res.status(201).json(group);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
// Create Group
const createGroup = async (req, res) => {
  try {
    const group = await Group.create({
      name: req.body.name,
      budget: req.body.budget,
      members: req.body.members,
      owner: req.body.owner,
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Groups
const getGroups = async (req, res) => {
  try {
    const userId = req.query.userId;

    const groups = await Group.find({
      owner: userId,
    });

    const result = await Promise.all(
      groups.map(async (group) => {
        const expenses = await Expense.find({
          group: group._id,
        });

        return {
          ...group.toObject(),
          id: group._id,
          expenses,
        };
      })
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createGroup,
  getGroups,
};