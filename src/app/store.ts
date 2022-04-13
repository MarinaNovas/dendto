import { configureStore } from '@reduxjs/toolkit';
import clasterReducer from '../reducers/clusterSlice';
import historyReducer from '../reducers/historySlice';

export const store = configureStore({
  reducer:{
    cluster:clasterReducer,
    history:historyReducer
  }
});