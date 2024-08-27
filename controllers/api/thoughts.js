const router = require("express").Router();
const { Thought, User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
