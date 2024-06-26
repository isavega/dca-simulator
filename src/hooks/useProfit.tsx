import { useState, useEffect } from 'react';
import useTrades from './useTrades.tsx';
import {
  setStatistics,
  setInvestmentTableData,
} from '../redux/slice/tradeSlice.tsx';
import { useDispatch } from 'react-redux';

const useProfit = (
  marketId: string,
  timestampsData: number[],
  datesData: string[],
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
        const previousPrice = prices[i - 1] || prices[0];

        const priceChange = (currentPrice - previousPrice) / previousPrice;

        currentInvestment *= 1 + priceChange;

        evolution.push(currentInvestment);
      }

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
          const investmentRatio = prices[i] / (prices[i - 1] || prices[0]);
          currentInvestment =
            currentInvestment * investmentRatio + periodicInvestment;
        } else {
          currentInvestment += periodicInvestment - initialInvestment;
        }

        evolution.push(currentInvestment);
      }

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

    const generateMultiples = (initialAmount: number, n: number): number[] => {
      const multiples: number[] = [];

      for (let i = 1; i <= n; i++) {
        multiples.push(initialAmount * i);
      }

      return multiples;
    };

    const payloadInvestmentTableData = () => {
      const periodicInvestment = initialInvestment / datesData.length;
      const payload = {
        datesArray: datesData,
        pricesArray: prices,
        investmentArray: generateMultiples(
          periodicInvestment,
          datesData.length,
        ),
        portfolioValueArray: evolutionDCA,
        amountChangeArray: evolutionDCA.map((value, index) => {
          return value - evolutionDCA[index - 1] || 0;
        }),
        percentageChangeArray: evolutionDCA.map((value, index) => {
          return (
            (value - evolutionDCA[index - 1]) / evolutionDCA[index - 1] || 0
          );
        }),
      };

      return { payload };
    };

    const { payload } = payloadInvestmentTableData();

    dispatch(setStatistics({ initialInvestment, returnRate, returnRateDCA }));
    dispatch(setInvestmentTableData({ ...payload }));
    setProfitData({ evolution, evolutionDCA });
  }, [dispatch, marketId, timestampsData, initialInvestment, prices]);

  return { profitData };
};

export default useProfit;
