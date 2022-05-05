import React,{useEffect}  from 'react'
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';




export default function Test() {
    const {id} = useParams();

    const socket = io('http://localhost:3040', {
        transports: ['websocket'],
        withCredentials: true,
      });


    const send = () => {
        socket.emit('gg', '123' , '6271af41c276c89f0608d0f7')
    }


    useEffect(() => {

        socket.on('connect', () => {
            console.log(socket.id)
            socket.emit('join-room', id)
        })
        socket.on('get-board', (board) => 
            console.log(board)
        )
        socket.on('error', (board) => 
            console.log(board)
        )
        socket.on('gg', msg => {
            console.log(msg)
        })
    })
    
  return (
    <div>
        <button onClick={() => send()} >send</button>
    </div>
  )
}
