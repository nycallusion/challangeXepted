const Sudoku = require('../database/modals/Sudoku');
const convertToMilliseconds = require('../middleware/convertToMilliseconds');
const {getAllUsers, findNextPlayer, changeScore} = require('../middleware/socket.io')
const io = require('socket.io')(3040, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});



const emitUsers = async(id) => {
    const getAllConnectedSocket = await io.in(id).fetchSockets();
    const users = getAllUsers(getAllConnectedSocket);
    io.to(id).emit('users', users);
}

io.on('connection', socket => {
    socket.on('join-room', async (id, user) => {
        try {
            await socket.join(id);
            let getBoard = await Sudoku.findById(id);
            socket.username = user;
            socket.roomID = id;
            io.to(socket.id).emit('get-board', getBoard);
            emitUsers(id);
        }
        catch (err) {
            socket.emit('error', err);
        }

    })
    socket.on('send-board', async(id) => {
        let getBoard = await Sudoku.findById(id);
        io.to(room).emit('gg', getBoard)
    })

    socket.on('update-sudoku', async(value) => {
        let board = await Sudoku.findById(value.id);
        let solution = board.solution;
        let players = board.players;
        if (solution[value.inputValue[0]] === value.inputValue[1]) {
            let boardToArr = board.board.split('')
            boardToArr[value.inputValue[0]] = value.inputValue[1];
            boardToArr = boardToArr.join('');
            board.board = boardToArr;
            board.players = changeScore(players, board.playerTurn, 1);
        } else {
            board.players = [...changeScore(players, board.playerTurn, -1)];
        }
        board.playerTurn = findNextPlayer(players, board.playerTurn);
        board.timerEnd = convertToMilliseconds(board.timer) + Date.now();
        await Sudoku.updateOne({_id: board._id},board);
        io.to(value.id).emit('get-board', board);
    })
    socket.on('update-player', async(prevPlayer, newPlayer, id) => {
        let board = await Sudoku.findById(id);
        const changePlayer = (players, prevPlayer, newPlayer) => {
            for (let i = 0; i < players.length; i++) {
                if (players[i].name === prevPlayer){
                    players[i].name = newPlayer;
                }
            }
            return players;
        }
        let players = changePlayer(board.players, prevPlayer, newPlayer)
        board.players = players;
        await Sudoku.updateOne({_id: board._id},board);
        io.to(id).emit('get-board', board);
        // io.to(room).emit('gg', getBoard)
    })




    socket.on("disconnect", async (reason) => {
        if (socket.roomID) {
            emitUsers(socket.roomID)
        }
      });
})

// socket.on('join-room', async (id) => {
//     await socket.join(id);
//     let getBoard = await Sudoku.findById(id);
//     socket.to(socket.id).emit('send board', getBoard)
// })
// socket.on('join-room', async(id) => {
//     let getBoard = await Sudoku.findById(id)
//     console.log(getBoard)
// })