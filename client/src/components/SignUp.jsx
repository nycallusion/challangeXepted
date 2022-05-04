import React, { useState } from "react";
import axios from "axios";
import {GoogleLogin} from "react-google-login";

export default function SignUp() {
    const [user, setUser] = useState({
        userName:'',
        password:''
    })

    // const handleUser = (event) => {
    //     let editUser = {...user};
    //     editUser[event.target.name] = event.target.value
    //     console.log(editUser)
    //     setUser(editUser)
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault()
    //     console.log('hit')
    //      let response = await axios.post(`${process.env.REACT_APP_API}/users`, user , {
    //         headers: {
    //           "Content-Type": "application/json"
    //         }
    //       })
    // };

    const onSuccess = (res) => {
        console.log('sucess', res.profileObj)
    };
    const onFailure = () => {
        console.log('failure')
    };

  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div>
           <GoogleLogin
           clientId={process.env.REACT_APP_googleClientId}
           buttonText="Login"
           onSuccess={onSuccess}
           onFailure={onFailure}
           cookiePolicy={'single_host_origin'}
           isSignedIn={true}
           />
        </div>
      {/* <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
          Get started today
        </h1>
        <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        <form action="" className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
          <p className="text-lg font-medium">Fast Sign up</p>

          <div>
        <label htmlFor="email" className="text-sm font-medium">Email</label>

        <div className="relative mt-1">
          <input
            type="string"
            id="userName"
            name='userName'
            value={user.userName}
            className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="Enter user name"
            onChange={(e) => handleUser(e)}
          />
          <span className="absolute inset-y-0 inline-flex items-center right-4">
          </span>
        </div>
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium">Password</label>

        <div className="relative mt-1">
          <input
            type="password"
            id="password"
            name='password'
            value={user.password}
            className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="Enter password"
            onChange={(e) => handleUser(e)}
          />

          <span className="absolute inset-y-0 inline-flex items-center right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

          <button
            type="submit"
            className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </button>
          <p className="text-sm text-center text-gray-500">
            Have account ?
            <a className="underline" href="">
              Sign In
            </a>
          </p>
        </form>
      </div> */}
    </div>
  );
}
