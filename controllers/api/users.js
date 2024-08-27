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

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    const thougts = await Thought.deleteMany({ username: user.username });
    res.json(user).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
