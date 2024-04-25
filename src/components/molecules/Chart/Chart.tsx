import React, { useCallback, useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  getTimestamps,
  convertTimestampsToSantiagoTime,
  formatNumberToCLP,
} from "../../../utils/index.tsx";
import useTrades from "../../../hooks/useTrades.tsx";
import useProfit from "../../../hooks/useProfit.tsx";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const Chart: React.FC = () => {
  const simulatorData = useSelector((state) => state.trade.simulatorData);

  const { marketId, frequency, startDate, endDate } = simulatorData;

  const timestampsData = useMemo(
    () => getTimestamps(startDate, endDate, frequency),
    [startDate, endDate, frequency]
  );

  const datesData = useMemo(
    () => convertTimestampsToSantiagoTime(timestampsData),
    [timestampsData]
  );

  const { averagePrices } = useTrades(marketId, timestampsData);

  if (
    datesData.length === 0 ||
    averagePrices.length === 0 ||
    !averagePrices ||
    !datesData
  ) {
    return <div>Loading...</div>;
  }

  const customize = {
    height: 500,
    withTooltip: true,
    legend: { hidden: false },
    margin: {
      left: 80,
      right: 10,
      top: 80,
      bottom: 80,
    },
  };

  return (
    <>
      <LineChart
        className="white-font"
        title="Valor del portafolio"
        xAxis={[
          {
            label: "Date",
            data: datesData,
            tickInterval: datesData,
            scaleType: "time",
            valueFormatter: (date) => dayjs(date).format("DD/MM/YYYY"),
          },
        ]}
        series={[
          {
            data: averagePrices,
            area: true,
            label: "Valor del portafolio",
            color: "#8884d8", //color del grafico
          },
        ]}
        width={500}
        {...customize}
      />
    </>
  );
};

export default Chart;

{
  /* <div>
        <h4>Dinero invertido: {formatNumberToCLP(amount)}</h4>
        <h4>Ganancia actual: {formatNumberToCLP(allIn)} </h4>
        <h4>
          Valor teórico del portafolio al invertir todo al inicio:{" "}
          {formatNumberToCLP(allIn)}{" "}
        </h4>
        <h4>Valor teórico del portafolio con DCA: {formatNumberToCLP(dca)} </h4>
        <h4>Rendimiento del portafolio: {profit}% </h4>
      </div> */
}
