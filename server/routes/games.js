const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middleware/authenticateJwtToken');
const sudoku = require('../middleware/games/sudokuBoard');
const Sudoku = require('../database/modals/Sudoku');
const { v4: uuidv4 } = require('uuid');
const convertToMilliseconds = require('../middleware/convertToMilliseconds');

router.get('/:id', async(req, res) => {
  try {
    let game = await Sudoku.findById(req.params.id).lean()
    if (!game) {
      res.status(404).json({message: 'notfound'})
    }

    delete game.solution;
    res.status(200).json(game);
  }
  catch(err) {
    res.status(404).json({err})
  }

})

router.post('/', authenticateToken, async(req, res) => {
  console.log(req.user)
    const {difficulty, player, timer, lives} = req.body.form;
    const {puzzle, solution} = sudoku.create(difficulty);
    
    let players = [{name:req.body.user.name, lives, score: 0, index:0}];
    for (let i = 2; i <= player; i++){
      players.push({
        name: `player ${i}`,
        lives,
        score: 0,
        index: i - 1
      })
    }

    const newGame = {
        // gameid: uuidv4(),
        owner: req.user.id,
        board: puzzle,
        solution,
        players,
        playerTurn: req.body.user.name,
        difficulty,
        timer,
        timerEnd: convertToMilliseconds(timer) + Date.now(),
        lives
    };

    const createGame = await Sudoku(newGame);
    await createGame.save();

    return res.status(200).json({
      status: "success",
      message: "Successfully Created Game Room",
      room: createGame._id,
    });
  });
  
  module.exports = router;
  