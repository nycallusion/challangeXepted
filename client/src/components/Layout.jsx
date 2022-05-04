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
        <div className='flex '>
            {user.profilePic ? <img src= {user.profilePic} alt='img'/> : <></>}
            {user.token ? <GoogleLogoutButton/> : <GoogleLoginButton/>}
        </div>
        <div className='flex justify-center items-center h-full w-full'>
            {props.children}
        </div>
    </div>
  )
}
