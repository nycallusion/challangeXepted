import React from 'react'
import {GoogleLogin} from "react-google-login";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../store/reducer/userReducer';

export default function GoogleLoginButton() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  const responseGoogle =  async(res) => {
    if (!user.token) {
      let {data} = await axios.post(`${process.env.REACT_APP_API}/users/google`, res.profileObj , {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch(setToken({token: data.token, user_id: data.user, name:data.name, profilePic: data.profilePic}));
    }
  };

  const onFailure = () => {
    console.log('failure')
  };

  return (
    <div>
        <GoogleLogin
        clientId={process.env.REACT_APP_googleClientId}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
    </div>
  )
}
