import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './slices/layout';

const store = configureStore({
  reducer: {
    layout: layoutReducer,
  },
});

export default store;
