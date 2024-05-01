import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  simulatorData: {
    crypto: 'BTC',
    amount: 0,
    currency: 'CLP',
    frequency: 'monthly',
    startDate: '2023-05-02',
    endDate: '2024-05-02',
    marketId: 'BTC-CLP',
  },
  statistics: {
    initialInvestment: 0,
    returnRate: 0,
    returnRateDCA: 0,
  },
  investmentTableData: {
    datesArray: [],
    pricesArray: [],
    investmentArray: [],
    portfolioValueArray: [],
    amountChangeArray: [],
    percentageChangeArray: [],
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
    setInvestmentTableData: (state, action) => {
      state.investmentTableData = action.payload;
    },
  },
});

export const { setSimulatorData, setStatistics, setInvestmentTableData } =
  tradeSlice.actions;
export default tradeSlice.reducer;
