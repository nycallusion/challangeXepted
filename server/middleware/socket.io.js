module.exports = {
    findNextPlayer: (players, currentPlayer) => {
        let player;
    
        for (let i = 0; i< players.length; i++) {
            if (players[i].name === currentPlayer) {
                let count = players.length ;
                for (let j = i === players.length -1 ? 0 : i + 1 ; j < players.length; j++) {
                    if (count === 0) {
                        break;
                    }
                    if (players[j].lives > 0) {
                        player = players[j].name;
                        break;
                    }
                    if (j === players.length - 1){
                        j = -1;
                    }
                    count --;
                }
                break;
            }   
        }
        return player;
    },
    changeScore: (players, currentPlayer, mod) => {
        players = [...players].map(player => {
            if (player.name === currentPlayer) {
                if (mod > 0) {
                    player.score ++;
                } else {
                    player.lives --;
                }  
            }
            return player;
        })
        return players;
    },
    getAllUsers: (socket) => {
        const users = [];
        for(let i = 0; i< socket.length;i++) {
            if (!users.includes(socket[i].username)) {
                users.push(socket[i].username);
            }
        }
        return users;
    }

}