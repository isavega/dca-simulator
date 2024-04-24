import React, { useCallback, useEffect } from "react";
import { getTrades } from "../api/buda.tsx";

const useTrades = (marketId: string, timestampArray: Array<number>) => {
  const [trades, setTrades] = React.useState<any>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const trades = await Promise.all(
          timestampArray.map((timestamp) => getTrades(marketId, timestamp))
        );
        setTrades(trades);
      } catch (error) {
        console.error("Failed to fetch trades:", error);
      }
    };

    fetchTrades();
  }, [marketId, timestampArray]);

  return { trades };
};

export default useTrades;
