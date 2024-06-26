import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {
  getTimestamps,
  convertTimestampsToSantiagoTime,
  formatDateToISO,
} from '../../../utils/index.tsx';
import useProfit from '../../../hooks/useProfit.tsx';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import bitcoinLogo from '../../../bitcoin.png';

const Chart: React.FC = () => {
  const { simulatorData } = useSelector((state) => state.trade);

  const {
    amount: initialInvestment,
    marketId,
    frequency,
    startDate,
    endDate,
  } = simulatorData;

  const timestampsData = useMemo(
    () => getTimestamps(startDate, endDate, frequency),
    [startDate, endDate, frequency],
  );

  const datesData = useMemo(
    () => convertTimestampsToSantiagoTime(timestampsData),
    [timestampsData],
  );

  const formattedDates = datesData.map(formatDateToISO);

  const { profitData } = useProfit(
    marketId,
    timestampsData,
    formattedDates,
    initialInvestment,
  );
  const { evolution, evolutionDCA } = profitData;

  const isDataLoading = useCallback(() => {
    if (!datesData || !profitData || initialInvestment === 0) {
      return true;
    }
    return false;
  }, [datesData, profitData, initialInvestment]);

  const [showBitcoin, setShowBitcoin] = useState(isDataLoading);

  useEffect(() => {
    if (!isDataLoading()) {
      setShowBitcoin(false);
    }
  }, [isDataLoading]);

  const customize = {
    height: 700,
    width: 800,
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
      {showBitcoin ? (
        <img src={bitcoinLogo} className="App-logo" alt="logo" />
      ) : (
        <>
          <LineChart
            className="white-font"
            title="Valor del portafolio"
            xAxis={[
              {
                label: 'Fecha',
                data: datesData,
                tickInterval: datesData,
                scaleType: 'time',
                valueFormatter: (date) => dayjs(date).format('DD/MM/YYYY'),
              },
            ]}
            series={[
              {
                data: evolutionDCA,
                label: 'DCA',
                color: '#8884d8',
              },
              {
                data: evolution,
                label: 'Inversión',
                color: '#82ca9d',
              },
            ]}
            {...customize}
          />
        </>
      )}
    </>
  );
};

export default Chart;
