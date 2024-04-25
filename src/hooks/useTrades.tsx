import React, { useCallback, useEffect, useState } from "react";
import { getTrades } from "../api/buda.tsx";

const useTrades = (marketId: string, timestampArray: Array<number>) => {
  const [averagePrices, setAveragePrices] = useState<Array<number>>([]);

  useEffect(() => {
    const fetchTradesAndCalculateAverage = async () => {
      try {
        const tradesData = await Promise.all(
          timestampArray.map((timestamp) => getTrades(marketId, timestamp))
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
          return Math.round(averagePrice * 100) / 100; // Truncar a 2 decimales
        });

        setAveragePrices(calculatedPrices);
      } catch (error) {
        console.error(
          "Failed to fetch trades or calculate average prices:",
          error
        );
      }
    };

    fetchTradesAndCalculateAverage();
  }, [marketId, timestampArray]);

  return { averagePrices };
};

export default useTrades;

// const calculatePrices = useCallback(() => {
//   const prices = trades.map((trade) => {
//     const total = trade.trades.entries.reduce(
//       (acc: number, [quantity, price]: [string, string]) => {
//         return acc + parseFloat(quantity) * parseFloat(price);
//       },
//       0
//     );

//     const totalQuantity = trade.trades.entries.reduce(
//       (acc: number, [quantity]: [string, string]) => {
//         return acc + parseFloat(quantity);
//       },
//       0
//     );

//     return total / totalQuantity;
//   });

//   return prices;
// }, [trades]);

// const calculateTimestamps = useCallback(() => {
//   const timestamps = trades.map((trade) => trade.trades.timestamp);
//   return timestamps;
// }, [trades]);

// const prices = calculatePrices();
// const timestamps = calculateTimestamps();
