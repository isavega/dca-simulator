import axios from 'axios';
import { GetMarketsResponse, GetTradesResponse } from '../models/buda';

const baseUrl =
  process.env.NODE_ENV === 'production' ? 'https://www.buda.com/api/v2' : '';

export const getMarkets = async () => {
  try {
    const response = await axios.get<GetMarketsResponse>(`${baseUrl}/markets`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTrades = async (marketId: string, timestamp: number) => {
  try {
    const response = await axios.get<GetTradesResponse>(
      `${baseUrl}/markets/${marketId}/trades?timestamp=${timestamp}&limit=5`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
