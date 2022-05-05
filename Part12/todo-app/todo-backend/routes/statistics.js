const express = require('express');
const { Todo } = require('../mongo');
const { getAsync } = require('../redis');
const router = express.Router();

// GET amount of todos in db
router.get('/', async (_, res) => {
  res.json({
    "added_todos": Number(await getAsync('added_todos')) || 0
  })
});

module.exports = router;
