import React, { useCallback, useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { getTimestamps } from "../../../utils/index.tsx";
import useTrades from "../../../hooks/useTrades.tsx";

const crypto = "btc";
const currency = "clp";
const amount = 1000000;
const frequency = "daily";
const startDate = "2021-01-01";
const endDate = "2021-01-13";

const Chart: React.FC = () => {
  const getDates = useMemo(
    () => getTimestamps(startDate, endDate, frequency),
    []
  );

  console.log(getDates);

  const { trades } = useTrades(`BTC-CLP`, getDates);

  const calculatePrices = useCallback(() => {
    const prices = trades.map((trade) => {
      const total = trade.trades.entries.reduce(
        (acc: number, [quantity, price]: [string, string]) => {
          return acc + parseFloat(quantity) * parseFloat(price);
        },
        0
      );

      const totalQuantity = trade.trades.entries.reduce(
        (acc: number, [quantity]: [string, string]) => {
          return acc + parseFloat(quantity);
        },
        0
      );

      return total / totalQuantity;
    });

    return prices;
  }, [trades]);

  const calculateTimestamps = useCallback(() => {
    const timestamps = trades.map((trade) => trade.trades.timestamp);
    return timestamps;
  }, [trades]);

  const prices = calculatePrices();
  const timestamps = calculateTimestamps();

  return (
    <LineChart
      xAxis={[{ data: timestamps }]}
      series={[
        {
          data: prices,
          area: true,
        },
      ]}
      width={500}
      height={300}
    />
  );
};

export default Chart;
