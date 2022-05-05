import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CountDown from './CountDown';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import UserList from './UserList';
import PlayerBoard from './PlayerBoard';
import { useNavigate } from "react-router-dom";
import ChatBox from './ChatBox';
// import {socket} from '../middleware/socket.io'

export default function GameRoom(props) {
  const socket = io(process.env.REACT_APP_socket_END_POINT, {
    transports: ['websocket'],
    withCredentials: true,
  });
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [inputValue, changeInputValue] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages,setMessages] = useState([]);
  
  const {id} = useParams();
  const user = useSelector(state => state.user)
  
  console.log(board);
  const createMatrix = (str) => {
      const arr = str.split('');
      const board = [];
      let row = [];
      for (let i = 1; i<= arr.length; i++) {
          row.push(arr[i-1]);
          if (i % 9 === 0 && i !== 0) {
              board.push(row);
              row = [];
          }
      }
      return board;
  }

  useEffect(() => {
    if(!board) {
        socket.on('connect', () => {
          socket.emit('join-room', id, user.name);
      })
      socket.on('get-board', (board) => {
        setBoard(board)
      })
    }
    socket.on('users', (users) => 
      setUsers(users)
    )
    socket.on('receive-message', (message , username) =>{
      let cpyMsgArr = [...messages];
      cpyMsgArr.push({message, username});
      setMessages(cpyMsgArr);
     })
    socket.on('error', (err) => 
      navigate('/404')
    )
    // socket.on('send-board', msg => {
    //     console.log(msg)
    // })
        //eslint-disable-next-line react-hooks/exhaustive-deps
  })

  const handleValueChange = (index, value) => {
    if (index === null) {
      return changeInputValue([]);
    }
    changeInputValue([index, value]);
  };

  const filledSudokuBox = (val) => {
    return (
      <div>
        {val}
      </div>
    )
  };

  const emptySudokuBox = (index) => {
    let fragment;
    let input = (
      <div className=''>
        <input className='border-hidden w-full h-full text-center text-blue-500 font-extrabold' type='number' min={1} max={9} onChange={(e) => handleValueChange(index, e.target.value)} />
      </div>)

    if (inputValue.length === 0) {
      fragment = input;
    } else {
      if (inputValue[0] === index) {
        fragment = input;
      } else {
        fragment = <div className='h-full w-full' onClick={() => handleValueChange(null)}></div>
      }
    }
    return fragment
  };

  const handleSubmit = () => {
      if (user.name !== board.playerTurn) {
        return alert("its not you'r turn or you are not in the game")
      }
      socket.emit('update-sudoku', {inputValue, id});
  };

  const handlePlayerChange = (prevPlayer, newPlayer) => {
    console.log(prevPlayer, newPlayer)
    if (prevPlayer === newPlayer || newPlayer === 'default') {
      return alert('Player is already at that slot');
    }
    socket.emit('update-player', prevPlayer, newPlayer, id);
  };

  const handleSendMessage = (message) => {
    if (message.length < 4) {
      return alert('Message length greater than 5')
    }
    socket.emit('send-message', message, user.name);
  };

return board ? 
  (
    <div className='flex container justify-center'>
      <div className='flex flex-col'>
        <div id='playerBoard'>
          <PlayerBoard players={board.players} user={user} owner={board.owner} users = {users} handlePlayerChange={handlePlayerChange}/>
        </div>
        <div className='flex items-center justify-between p-2'>
            <div className='p-2 flex flex-col items-center'>
              <h1 className='text-lg font-bold'> Current Player Turn</h1>
              <h2>{user.user_id === board.playerTurn ? user.name : board.playerTurn}</h2>
            </div>
            <div className='p-2'>
              <h1 className='text-lg font-bold'>Timer</h1>
              <CountDown timerEnd = {board.timerEnd}/>
            </div>
        </div>
        <div id='board' className='flex flex-col'>
          {createMatrix(board.board).map((row, i) => {
          return(
              <div key={i} className='flex'>
                  {row.map((num,j) => 
                      <div className={`p-1 border-2 ${j % 3 === 0 ?'border-l-black' : ''} ${j  === row.length-1?'border-r-black' : 'border-r-white'}
                      ${i % 3 === 0 ?'border-t-black' : ''} ${i  === row.length-1?'border-b-black' : ''}
                      hover:bg-blue-300
                      `} key={j}>
                          <div className=' w-[50px] h-[50px] flex items-center justify-center'>{num[0] === '-' ? emptySudokuBox((9 * i) + j) : filledSudokuBox(num[0])}</div>
                      </div>
                  )}
              </div> 
          )})}
        </div>
        <div id='submit' className='p-2'>
          <button
            className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
      <div className=''>
        <UserList users = {users}/>
        <ChatBox handleSendMessage={handleSendMessage} messages={messages}/>
      </div>

    </div>
  )
  :
  <></>
}
