const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SudokuSchema = new mongoose.Schema({
    gamename : {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    board: {
        type: String
    },
    solution: {
        type: String
    },
    players: [   
    ],
    playerTurn: {
        type: String
    },
    difficulty: {
        type: String,
    },
    timer: {
        type: String,
    },
    timerEnd: {
        type: String,
    },
    lives: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: true
    },

    timestamp: {
        type: String,
        default: () => Date.now(),
    },
});



module.exports = mongoose.model("Sudoku", SudokuSchema);