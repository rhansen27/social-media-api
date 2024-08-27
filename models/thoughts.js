const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const reactionSchema = new Schema(
  {
    reachtionId: {
      type: mongoose.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    reachtionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

function formatDate(date) {
  return date.toLocaleDateString();
}

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: new Date().toLocaleDateString(),
  },
  username: {
    type: String,
    required: true,
  },
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
