// routes/studentRoutes.js

const express = require("express");
const studentController = require("../controllers/studentController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);

router.get("/sessions", studentController.getFreeSessions);
router.post("/book", studentController.bookSession);

module.exports = router;
