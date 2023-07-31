// controllers/DeanController.js

const Session = require("../models/session");

exports.getPendingSessions = async (req, res) => {
  try {
    const pendingSessions = await Session.find({ bookedBy: { $ne: null } });
    res.json({ pendingSessions });
  } catch (err) {
    console.error("Error while fetching pending sessions:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
