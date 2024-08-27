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
