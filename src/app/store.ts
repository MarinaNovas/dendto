import { configureStore } from '@reduxjs/toolkit';
import clasterReducer from '../reducers/clusterSlice';

export const store = configureStore({
  reducer:{
    cluster:clasterReducer
  }
});