const express = require('express');
const { createTask, getTasks, updateTask, deleteTask, getAllTasks, updateTaskStatus } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getTasks);
router.get('/all', protect, getAllTasks);
router.put('/status/:id', protect, updateTaskStatus);
router.post('/', protect, createTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;