import React, {useEffect, useState , useContext} from 'react';
import {SocketContext} from '../middleware/socket';

export default function ChatBox(props) {
    const [message,setMessage] = useState([]);
    const [messages,setMessages] = useState([]);
    const socket = useContext(SocketContext);

    const handleSendMessage = (message) => {
      if (message.length < 4) {
        return alert('Message length greater than 5')
      }
      socket.emit('send-message', message, props.user.name, props.id);
    };

    useEffect(() => {
      socket.on('receive-message', (message , username) =>{
        let cpyMsgArr = [...messages];
        cpyMsgArr.push({message, username});
        setMessages(cpyMsgArr);
       })

    });

  return (
    <div id='chatBox' className='flex flex-col p-3 mt-3 w-[300px] border-2 ml-3'>
        <div className='text-center text-xl font-bold bg-blue-300'>chat</div>
        <div className='flex flex-col overflow-ellipsis mt-2'>
        {messages.map((message, i) =>
            <div className=' mt-2' key={i}>
                <h1 className='text-green-500 text-center font-bold bg-blue-100 border-[.5px] border-slate-300'>{message.username}</h1>
                <p className='bg-slate-200 text-center'>{message.message}</p>
            </div> 
        )}
        </div>
    <div className='mt-1 flex justify-center '>
      <input className='rounded-lg w-full' type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
    </div>
    <div className='mt-1'>
      <button className="w-full px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg" onClick={() => {
          setMessage('')
          handleSendMessage(message)
          }} >Send Message</button>
    </div>
  </div>
  )
}
