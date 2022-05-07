import React, { useEffect , useContext } from 'react'
import {SocketContext} from '../middleware/socket';




export default function Test() {
  const socket = useContext(SocketContext);
    useEffect(() => {
        socket.on('test', (test) => 
        console.log(test)
      )
    },[socket])

  return (
    <div>Test</div>
  )
}
