const express = require('express');
const router = express.Router();
const userRouter = require('./users')
const gameRouter = require('./games')

/* GET home page. */
router.use('/users', userRouter)
router.use('/games', gameRouter)

module.exports = router;
