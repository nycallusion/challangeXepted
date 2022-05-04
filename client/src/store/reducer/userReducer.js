import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-uuid';

export const userSlice = createSlice({
  name: 'authentication',
  initialState: {
    token: null,
    user_id: null,
    profilePic: '',
    name: `guess-${uuid()}`,
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

  }
});

export const { setToken, logout , updateUser} = userSlice.actions;