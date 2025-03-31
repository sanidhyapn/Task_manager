const Task = require("../models/Task");

// 🔹 Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, category, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = new Task({
      user: req.user.id,
      title,
      description,
      category,
      priority,
      dueDate,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// 🔹 Get all tasks (with filtering & search)
const getTasks = async (req, res) => {
  try {
    const { category, status, search } = req.query;

    let query = { user: req.user.id };

    if (category) query.category = category;
    if (status) query.status = status;

    // Ensure the search query does not include unintended newline characters
    if (search) {
      const sanitizedSearch = search.trim(); // Remove extra spaces/newlines
      query.title = { $regex: new RegExp(sanitizedSearch, "i") };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// 🔹 Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

// 🔹 Update a task by ID
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// 🔹 Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

const getTaskSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({
      user: userId,
      status: "Completed",
    });
    const pendingTasks = await Task.countDocuments({
      user: userId,
      status: "Pending",
    });
    const overdueTasks = await Task.countDocuments({
      user: userId,
      dueDate: { $lt: new Date() },
      status: "Pending",
    });

    res.json({ totalTasks, completedTasks, pendingTasks, overdueTasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task summary", error });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskSummary,
};
