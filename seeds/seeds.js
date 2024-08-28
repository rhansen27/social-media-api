const connection = require("../config/connection");
const { User, Thought } = require("../models");
const userSeeds = require("./usersData.json");
const thoughtSeeds = require("./thoughtData.json");

connection.once("connected", async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});
  const thoughts = await Thought.insertMany(thoughtSeeds);
  const users = await User.insertMany(userSeeds);

  for (i = 0; i < thoughts.length; i++) {
    const currentThought = thoughts[i];
    const rnd = Math.floor(Math.random() * users.length);
    const rndUser = users[rnd]._id;

    const currentUser = await User.findOneAndUpdate(
      { username: currentThought.username },
      {
        $addToSet: { thoughts: currentThought._id, friends: rndUser },
      }
    );
  }
  process.exit(0);
});
