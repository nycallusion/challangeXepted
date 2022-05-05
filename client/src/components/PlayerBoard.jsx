import React, { useState } from "react";
import uuid from 'react-uuid';

export default function PlayerBoard(props) {
  const {user, owner, players, users, handlePlayerChange} = props;
  const [choice, setChoice] = useState({prev:'', new:''})
  console.log(props.owner)

  
  return (
    <div className="p-1">
      <div className="flex justify-around text-lg bg-blue-300  border-1 border-black">
        <h1>Players</h1>
        <h1>Lives</h1>
        <h1>Score</h1>
      </div>
      {players.map((player, i) => (
        <div key={i}className={`flex justify-around  ${player.lives > 0 ? 'bg-slate-200' : 'bg-red-200'}`} >
            {(user.user_id === owner ? 
            <div className="flex justify-center items-center w-[33%]">
              <select className="w-full text-center border-hidden" defaultValue={"default"} onChange={(e) => handlePlayerChange(players[i].name, e.target.value)}>
                <option key={uuid()} value={"default"} >{player.name}</option>
                {users.map((roomUser, j) => {
                if (user.name !== roomUser && i !== 0) {
                  return <option key={uuid()} value={roomUser} >{roomUser}</option>
                } else {
                  return <React.Fragment key={uuid()}> </React.Fragment>
                }
              })}
              </select>
            </div>

            :
            <div className="w-[33%] flex justify-center">{user.user_id === player.name ? props.user.name.slice(0,15) : player.name.slice(0,15)}</div>
            )}
          <div className="w-[33%] flex justify-center">{player.lives}</div>
          <div className="w-[33%] flex justify-center">{player.score}</div>
        </div>
      ))}
    </div>
  );
}
