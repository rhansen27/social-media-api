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

router.post("/", async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      {
        username: req.body.username,
      },
      {
        $addToSet: {
          thoughts: thought._id,
        },
      },
      {
        new: true,
      }
    );
    res.json(thought).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const thought = await Thought.findByIdAndUpdate(
      id,
      {
        thoughtText: req.body.thoughtText,
      },
      { new: true }
    );
    res.json(thought).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const thought = await Thought.findByIdAndDelete(id);
    res.json({ ...deleteModel._doc, message: "Thought deleted" }).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
