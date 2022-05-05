let arr = [
    {name:5 , lives:0},
    {name:1 , lives:2},
    {name:2 , lives:0},
     {name:3 , lives:1},
    {name:4 , lives:1}
  ]

const findNextPlayer = (players, currentPlayer) => {
let player;

for (let i = 0; i< players.length; i++) {
  if (players[i].name === currentPlayer) {
      let count = players.length ;
      for (let j = i === players.length -1 ? 0 : i + 1 ; j <= players.length; j++) {
          console.log(players[i].name)
          if (count === 0) {
              break;
          }
          if (players[j].lives > 0) {
              console.log(players[j].name)
                player = players[j].name
                break;
          }
          if (j === players.length -1){
              j = -1;
          }
          count --;
      }
      break;
  }
}
return player;
};

console.log(findNextPlayer(arr , 4))