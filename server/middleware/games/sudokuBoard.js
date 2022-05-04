// const { makepuzzle, solvepuzzle, ratepuzzle } = require('sudoku');
const { getSudoku } = require ('sudoku-gen');
module.exports = {
    create: (difficulty) => {
        board = getSudoku(difficulty || null)
        return board;
    }
};