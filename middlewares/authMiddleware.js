// middlewares/authMiddleware.js

const User = require("../models/user");

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findOne({ token }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticate;
