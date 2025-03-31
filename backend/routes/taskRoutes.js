const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskSummary, // Import Task Summary
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Get Task Summary (Protected) - MUST COME BEFORE `/:id`
router.get("/summary", protect, getTaskSummary);

// 🔹 Get all tasks of logged-in user (Protected)
router.get("/", protect, getTasks);

// 🔹 Get a single task by ID (Protected)
router.get("/:id", protect, getTaskById);

// 🔹 Create, Update, Delete routes...
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
