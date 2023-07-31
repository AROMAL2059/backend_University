// models/session.js

const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
