// routes/deanRoutes.js

const express = require("express");
const deanController = require("../controllers/DeanController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);

router.get("/pending-sessions", deanController.getPendingSessions);

module.exports = router;
