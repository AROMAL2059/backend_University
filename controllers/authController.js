// controllers/authController.js

const bcrypt = require("bcrypt");
const uuid = require("uuid");
const User = require("../models/user");

function generateToken() {
  return uuid.v4();
}

exports.studentLogin = async (req, res) => {
  const { universityID, password } = req.body;
  try {
    const student = await User.findOne({ universityID, userType: "student" });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken();
    student.token = token;
    await student.save();

    res.json({ token });
  } catch (err) {
    console.error("Error during student login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deanLogin = async (req, res) => {
  const { universityID, password } = req.body;
  try {
    const dean = await User.findOne({ universityID, userType: "dean" });
    if (!dean) {
      return res.status(404).json({ message: "Dean not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, dean.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken();
    dean.token = token;
    await dean.save();

    res.json({ token });
  } catch (err) {
    console.error("Error during dean login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
