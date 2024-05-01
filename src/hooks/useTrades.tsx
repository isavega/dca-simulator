import React, { useEffect, useState } from 'react';
import { getTrades } from '../api/buda.tsx';
import { useDispatch } from 'react-redux';

const useTrades = (
  marketId: string,
  timestampArray: Array<number>,
  initialInvestment: number,
) => {
  const dispatch = useDispatch();
  const [averagePrices, setAveragePrices] = useState<Array<number>>([]);

  useEffect(() => {
    if (initialInvestment === 0) {
      return;
    }
    const fetchTradesAndCalculateAverage = async () => {
      try {
        const tradesData = await Promise.all(
          timestampArray.map((timestamp) => getTrades(marketId, timestamp)),
        );

        const calculatedPrices = tradesData.map((trade) => {
          const entries = trade.trades.entries;
          let totalAmount = 0;
          let totalPrice = 0;

          entries.forEach((entry) => {
            const amount = parseFloat(entry[1]);
            const price = parseFloat(entry[2]);
            totalAmount += amount;
            totalPrice += amount * price;
          });

          const averagePrice = totalAmount > 0 ? totalPrice / totalAmount : 0;
          return Math.round(averagePrice * 100) / 100;
        });

        setAveragePrices(calculatedPrices);
      } catch (error) {
        console.error(
          'Failed to fetch trades or calculate average prices:',
          error,
        );
      }
    };

    fetchTradesAndCalculateAverage();
  }, [marketId, timestampArray, initialInvestment, dispatch]);

  return { averagePrices };
};

export default useTrades;
