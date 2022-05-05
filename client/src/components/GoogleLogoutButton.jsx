import React from 'react'
import {GoogleLogout} from "react-google-login";
import { useDispatch } from 'react-redux';
import { logout } from '../store/reducer/userReducer';
export default function GoogleLogoutButton() {
    const dispatch = useDispatch();
    const responseGoogle =  async() => {
        dispatch(logout());
      };
  return (
    <div>        
        <GoogleLogout
            clientId={process.env.REACT_APP_googleClientId}
            buttonText="Logout"
            onLogoutSuccess={responseGoogle}
        />
    </div>
  )
}
