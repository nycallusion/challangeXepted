import React, { useEffect, useState, useContext } from 'react'
import {SocketContext} from '../middleware/socket';

export default function GameRooms() {
    const socket = useContext(SocketContext);
    const [rooms,setRooms] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('get-rooms');
        })
        socket.on('send-rooms', (rooms) => 
            setRooms(rooms)
        ) 
    })

  return (
    <div className='flex-col justify-center border-2 w-[60%]'>
        <div>
            <h1 className='text-center text-lg'>GameRoom</h1>
        </div>                  
        <div className='p-1 flex flex-col '>
            {rooms.map((room, i) =>
                <a key={i} href={`/room/${room.id}`} className='bg-blue-300 text-white hover:bg-slate-300 hover:text-black mt-1 text-center' >{room.gamename ? room.gamename : room.id}</a>
            )}
        </div>
    </div>
  )
}
