import React, { useEffect } from 'react'
import GoogleLoginButton from "./GoogleLoginButton";
import GoogleLogoutButton from "./GoogleLogoutButton";
import { gapi } from 'gapi-script'
import { useSelector} from 'react-redux';


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
    <div className='flex flex-col h-screen w-screen'>
        <div className='flex justify-evenly p-2 h-[100px]'>
            <div className='h-[100px]'>
                {user.profilePic ? <img className='h-[100px]' src= {user.profilePic} alt='img'/> : <></>}
            </div>
            <div className='flex'>
                <h1 className='p-1'>User Name:</h1>
                <h1 className='p-1'>{user.name}</h1>
            </div>
            <div className=''>
                {user.token ? <GoogleLogoutButton/> : <GoogleLoginButton/>}
            </div>

        </div>
        <div className='flex justify-center items-center h-full w-full'>
            {props.children}
        </div>
    </div>
  )
}
