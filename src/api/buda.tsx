import axios from "axios";
import { GetMarketsResponse, GetTradesResponse } from "../models/buda";

export const getMarkets = async () => {
  try {
    const response = await axios.get<GetMarketsResponse>(`/markets`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTrades = async (marketId: string, timestamp: number) => {
  try {
    const response = await axios.get<GetTradesResponse>(
      `/markets/${marketId}/trades?timestamp=${timestamp}&limit=5`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
