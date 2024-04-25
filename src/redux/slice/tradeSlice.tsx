import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  simulatorData: {
    crypto: "",
    amount: 0,
    currency: "",
    frequency: "monthly",
    startDate: "01/01/2021",
    endDate: "01/03/2021",
    marketId: "",
  },
};

const tradeSlice = createSlice({
  name: "trade",
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
