import { io } from 'socket.io-client';


export const socket = io(process.env.REACT_APP_socket_END_POINT, {
    transports: ['websocket'],
    withCredentials: true,
  });