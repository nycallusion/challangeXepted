import React, { useEffect } from 'react'
import { socket } from '../middleware/socket.io'




export default function Test() {

    useEffect(() => {
        socket.on('test', (test) => 
        console.log(test)
      )
    },[socket])

  return (
    <div>Test</div>
  )
}
