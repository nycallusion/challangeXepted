import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-uuid';
const user = `guess-${uuid()}`;
export const userSlice = createSlice({
  name: 'authentication',
  initialState: {
    token: null,
    user_id: user,
    profilePic: '',
    name: user,
    guess:true

  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload.token;
      state.user_id = payload.user_id;
      state.profilePic = payload.profilePic;
      state.name = payload.name;
      state.guess = false;
    },
    logout: (state, { payload }) => {
      state.token = null;
      state.user_id = null;
      state.profilePic = '';
      state.name = `guess-${uuid()}`;
      state.guess = true;
    },
    updateUser: (state,  { payload }) => {
      state.profilePic = payload.profilePic;
    },
    updateUsername: (state,  { payload }) => {
      state.name = payload
    },

  }
});

export const { setToken, logout , updateUser, updateUsername} = userSlice.actions;