const router = require("express").Router();
const { User, Thought } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.json(user).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
