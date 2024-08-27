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

router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        $addToSet: {
          reactions: req.body,
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

router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;
    const thought = await Thought.findById(thoughtId);

    //deletes the reaction with the matching id from the array
    //and then saves the document.
    thought.reactions.id(reactionId).deleteOne();
    await thought.save();

    res.json(thought).status(200);
  } catch (error) {
    res.json(error).status(500);
    console.log(error);
  }
});

module.exports = router;
