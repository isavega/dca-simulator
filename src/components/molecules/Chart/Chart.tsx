import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {
  getTimestamps,
  convertTimestampsToSantiagoTime,
  formatNumberToCLP,
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

  const { profitData } = useProfit(marketId, timestampsData, initialInvestment);
  const { evolution, returnRate, evolutionDCA, returnRateDCA } = profitData;

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
      {showBitcoin ? (
        <img src={bitcoinLogo} className="App-logo" alt="logo" />
      ) : (
        <>
          <div>
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
                  // area: true,
                  label: 'DCA',
                  color: '#8884d8', //color del grafico
                },
                {
                  data: evolution,
                  // area: true,
                  label: 'NORMAL',
                  color: '#82ca9d', //color del grafico
                },
              ]}
              width={500}
              {...customize}
            />
          </div>
          <div>
            <h4>Dinero invertido: {formatNumberToCLP(initialInvestment)}</h4>
            <h4>Retorno de inversión: {returnRate * 100}%</h4>
            <h4>Retorno de inversión con DCA: {returnRateDCA * 100}%</h4>
            {returnRateDCA > returnRate ? (
              <h4>
                En el rango de tiempo seleccionado, la estraegia DCA es mejor en
                un {Math.abs(returnRateDCA - returnRate) * 100}%.
              </h4>
            ) : (
              <h4>
                n el rango de tiempo seleccionado, la estraegia de inversión
                normal es mejor en un{' '}
                {Math.abs(returnRateDCA - returnRate) * 100}%.
              </h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Chart;
