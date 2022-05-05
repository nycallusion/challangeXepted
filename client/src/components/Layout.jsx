import React, { useEffect } from 'react'
import GoogleLoginButton from "./GoogleLoginButton";
import GoogleLogoutButton from "./GoogleLogoutButton";
import { gapi } from 'gapi-script'
import { useSelector} from 'react-redux';
import GameRooms from './GameRooms';


export default function Layout(props) {
    const user = useSelector(state => state.user)
    useEffect(() => {
        function start() {
            gapi.auth2.init({
                clientId: process.env.REACT_APP_googleClientId,
                scope:''
            })
        };
        gapi.load('client:auth2', start)
    });
  return (
    <div className='flex flex-col h-full w-full items-center'>
        <div className='flex justify-around p-2 h-[100px] w-full'>
            <div className='flex items-center '>
                <a  href={`/`} className='bg-blue-400 mt-1 text-white p-3 hover:bg-slate-300 hover:text-black' >HOME</a>
            </div>
            <div className='flex items-center'>
                <h1 className='p-1'>User Name:</h1>
                <h1 className='p-1'>{user.name}</h1>
            </div>
            <div className='h-[100px]'>
                {user.profilePic ? <img className='h-[100px]' src= {user.profilePic} alt='img'/> : <></>}
            </div>
            <div className='flex items-center'>
                {user.token ? <GoogleLogoutButton/> : <GoogleLoginButton/>}
            </div>
        </div>
        <div className='flex flex-col p-3 mt-10 container items-center'>
            {props.children}
            <GameRooms/>
        </div>

    </div>
  )
}
