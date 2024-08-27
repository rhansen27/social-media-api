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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const thought = await Thought.findById(id);
    res.json(thought).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
