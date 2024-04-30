import { useState, useEffect } from 'react';
import useTrades from './useTrades.tsx';
import { setStatistics } from '../redux/slice/tradeSlice.tsx';
import { useDispatch } from 'react-redux';

const useProfit = (
  marketId: string,
  timestampsData: number[],
  initialInvestment: number,
) => {
  const dispatch = useDispatch();
  const { averagePrices: prices } = useTrades(
    marketId,
    timestampsData,
    initialInvestment,
  );

  const [profitData, setProfitData] = useState<{
    evolution: number[];

    evolutionDCA: number[];
  }>({ evolution: [], evolutionDCA: [] });

  useEffect(() => {
    if (prices.length !== timestampsData.length || initialInvestment === 0) {
      return;
    }

    const calculateInvestmentEvolution = (
      prices: number[],
      initialInvestment: number,
    ): { evolution: number[]; returnRate: number } => {
      const evolution: number[] = [];
      let currentInvestment = initialInvestment;

      for (let i = 0; i < prices.length; i++) {
        const currentPrice = prices[i];
        const previousPrice = prices[i - 1] || prices[0]; // Usar el precio anterior o el primer precio si no hay precio anterior

        // Calcular el cambio porcentual en el precio desde el precio anterior
        const priceChange = (currentPrice - previousPrice) / previousPrice;

        // Aplicar el cambio porcentual al valor de la inversión
        currentInvestment *= 1 + priceChange;

        // Agregar el valor actual de la inversión al array de evolución
        evolution.push(currentInvestment);
      }

      // Calcular la tasa de retorno de la inversión
      const returnRate =
        (currentInvestment - initialInvestment) / initialInvestment;

      return { evolution, returnRate };
    };
    const calculateInvestmentEvolutionDCA = (
      prices: number[],
      dates: number[],
      initialInvestment: number,
    ): { evolution: number[]; returnRate: number } => {
      const evolution: number[] = [];
      let currentInvestment = initialInvestment;
      let periodicInvestment = initialInvestment / dates.length;

      for (let i = 0; i < prices.length; i++) {
        if (i > 0) {
          // Calcular la inversión periódica basada en la proporción de precio actual al precio inicial
          const investmentRatio = prices[i] / (prices[i - 1] || prices[0]);
          currentInvestment =
            currentInvestment * investmentRatio + periodicInvestment;
        } else {
          currentInvestment += periodicInvestment - initialInvestment;
        }

        // Agregar el valor actual de la inversión al array de evolución
        evolution.push(currentInvestment);
      }

      // Calcular la tasa de retorno de la inversión
      const returnRate =
        (currentInvestment - initialInvestment) / initialInvestment;

      return { evolution, returnRate };
    };

    const { evolution, returnRate } = calculateInvestmentEvolution(
      prices,
      initialInvestment,
    );

    const { evolution: evolutionDCA, returnRate: returnRateDCA } =
      calculateInvestmentEvolutionDCA(
        prices,
        timestampsData,
        initialInvestment,
      );

    dispatch(setStatistics({ initialInvestment, returnRate, returnRateDCA }));
    setProfitData({ evolution, evolutionDCA });
  }, [prices, timestampsData, initialInvestment, setProfitData, dispatch]);

  return { profitData };
};

export default useProfit;
