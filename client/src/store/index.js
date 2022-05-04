import {createStore , applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allReducers } from './reducer/combineReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root2',
    storage,
  };
  

  export const persistedReducer = persistReducer(persistConfig, allReducers);
  export const store = createStore(persistedReducer , composeWithDevTools(applyMiddleware(logger,thunk))); 