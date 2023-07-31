// controllers/studentController.js

const Session = require("../models/session");

exports.getFreeSessions = async (req, res) => {
  try {
    const freeSessions = await Session.find({ bookedBy: null });
    res.json({ sessions: freeSessions });
  } catch (err) {
    console.error("Error while fetching free sessions:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.bookSession = async (req, res) => {
  const { sessionID } = req.body;
  try {
    const session = await Session.findById(sessionID);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.bookedBy) {
      return res.status(400).json({ message: "Session already booked" });
    }

    session.bookedBy = req.user._id;
    await session.save();

    res.json({ message: "Session booked successfully." });
  } catch (err) {
    console.error("Error while booking session:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
