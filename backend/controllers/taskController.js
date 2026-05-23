const Task = require('../models/Task');

// Create new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const task = new Task({
      userId: req.user.id,
      title,
      description,
      dueDate
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks for logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};