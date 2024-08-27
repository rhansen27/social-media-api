const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://27017/social-media-db");

module.exports = mongoose.connection;
