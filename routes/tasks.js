const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/require-auth');
const validate = require('express-validation');
const validation = require('../validations/tasks-validation');
const database = require('firebase-admin').database();

router.use(requireAuth);

/**
 * Create a new task
 */
router.post('/', validate(validation.createTask), function (req, res) {
  const userId = req.user.uid;
  const ref = database.ref(`tasks/${userId}`);
  const body = req.body;
  const task = {
    title: body.title,
    completed: false
  };
  if (body.description) {
    task.description = body.description;
  }
  const resultRef = ref.push(task);
  res.json({
    id: resultRef.key,
    data: task
  });
});

/**
 * Get all tasks for current user
 */
router.get('/', function (req, res) {
  const userId = req.user.uid;
  const ref = database.ref(`tasks/${userId}`);
  ref.on("value", data => {
    try {
      res.json({
        status: data ? 200 : 404,
        data
      });
    } catch (e) {
      console.error(e);
    }
  });
});

/**
 * Get a single task by id
 */
router.get('/:taskId', function (req, res) {
  const userId = req.user.uid;
  const taskId = req.params.taskId;
  const ref = database.ref(`tasks/${userId}/${taskId}`);
  ref.on("value", data => {
    res.json({
      status: data ? 200 : 404,
      data
    });
  });
});

/**
 * Update task by id
 */
router.put('/:taskId', validate(validation.updateTask), function (req, res) {
  const userId = req.user.uid;
  const taskId = req.params.taskId;
  const ref = database.ref(`tasks/${userId}/${taskId}`);
  const body = req.body;
  const updates = {};
  if (body.title) {
    updates.title = body.title;
  }
  if (body.description) {
    updates.description = body.description;
  }
  if (body.completed) {
    updates.completed = body.completed;
  }
  ref.update(updates).then(() => {
    res.json({
      status: 200,
      message: "Updated",
      data: updates
    });
  });
});


/**
 * Delete task by id
 */
router.delete('/:taskId', function (req, res) {
  const userId = req.user.uid;
  const taskId = req.params.taskId;
  const ref = database.ref(`tasks/${userId}/${taskId}`);
  ref.remove().then(() => {
    res.json({
      status: 200,
      message: "Deleted"
    })
  })
});


module.exports = router;
