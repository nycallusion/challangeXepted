const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middleware/authenticateJwtToken');
const sudoku = require('../middleware/games/sudokuBoard')
const Sudoku = require('../database/modals/Sudoku')
const { v4: uuidv4 } = require('uuid');
const convertToMilliseconds = require('../middleware/convertToMilliseconds')

router.get('/:id', async(req, res) => {
    let game = await Sudoku.findById(req.params.id);
    console.log(game)
    res.status(200).json(game)
})

router.post('/', authenticateToken, async(req, res) => {
    const {difficulty, player, timer, lives} = req.body.form;
    const {puzzle, solution} = sudoku.create(difficulty)
    const newGame = {
        // gameid: uuidv4(),
        owner: req.user.id,
        board: puzzle,
        solution,
        players: [{name:req.user.id, lives}, {name:'Player 2', lives}, {name:'Player 3', lives},{name:'Player 4', lives}],
        playerTurn: req.user.id,
        difficulty,
        timer,
        timerEnd: convertToMilliseconds(timer) + Date.now(),
        lives
    }
    const createGame = await Sudoku(newGame)
    await createGame.save()

    return res.status(200).json({
      status: "success",
      message: "Successfully Created Game Room",
      room: createGame._id
    });
  });
  
  module.exports = router;
  