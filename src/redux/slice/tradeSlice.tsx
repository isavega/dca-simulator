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
  statistics: {
    initialInvestment: 0,
    returnRate: 0,
    returnRateDCA: 0,
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
    setStatistics: (state, action) => {
      state.statistics = action.payload;
    },
  },
});

export const { setSimulatorData, setStatistics } = tradeSlice.actions;
export default tradeSlice.reducer;
