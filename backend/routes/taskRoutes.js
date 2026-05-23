const express = require('express');
const { createTask, getTasks, updateTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getTasks);
router.post('/', protect, createTask);
router.put('/:id', protect, updateTask);

module.exports = router;