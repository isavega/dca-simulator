import { configureStore } from '@reduxjs/toolkit';
import tradeReducer from '../slice/tradeSlice.tsx';

const store = configureStore({
  reducer: {
    trade: tradeReducer,
  },
});

export default store;
