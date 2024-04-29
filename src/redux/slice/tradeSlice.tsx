import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  simulatorData: {
    crypto: '',
    amount: 0,
    currency: '',
    frequency: 'monthly',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    marketId: 'BTC-CLP',
  },
};

const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    setSimulatorData: (state, action) => {
      state.simulatorData = action.payload;
      state.simulatorData.marketId = `${action.payload.crypto}-${action.payload.currency}`;
    },
  },
});

export const { setSimulatorData } = tradeSlice.actions;
export default tradeSlice.reducer;
