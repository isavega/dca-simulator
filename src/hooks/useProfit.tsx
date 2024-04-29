import { useState, useEffect } from 'react';
import useTrades from './useTrades.tsx';

const useProfit = (
  marketId: string,
  timestampsData: number[],
  initialInvestment: number,
) => {
  const { averagePrices: prices } = useTrades(
    marketId,
    timestampsData,
    initialInvestment,
  );

  const [profitData, setProfitData] = useState<{
    evolution: number[];
    returnRate: number;
    evolutionDCA: number[];
    returnRateDCA: number;
  }>({ evolution: [], returnRate: 0, evolutionDCA: [], returnRateDCA: 0 });

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
      dates: any[],
      initialInvestment: number,
    ): { evolution: number[]; returnRate: number } => {
      const evolution: number[] = [];
      let currentInvestment = initialInvestment;
      const periodicInvestment = initialInvestment / dates.length;

      for (let i = 0; i < prices.length; i++) {
        // Add the periodic investment to the current investment

        currentInvestment += periodicInvestment;

        // Adjust the current investment based on the current price
        currentInvestment =
          currentInvestment * (prices[i] / prices[i - 1] || 1);

        // Add the current investment value to the evolution array
        evolution.push(currentInvestment);
      }

      // Calculate the return rate of the investment
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

    setProfitData({ evolution, returnRate, evolutionDCA, returnRateDCA });
  }, [prices, timestampsData, initialInvestment, setProfitData]);

  return { profitData };
};

export default useProfit;
