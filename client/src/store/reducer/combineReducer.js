import {userSlice} from './userReducer';
import {combineReducers} from 'redux';



export const allReducers = combineReducers({user: userSlice.reducer});