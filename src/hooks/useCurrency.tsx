import { useEffect, useState, useCallback } from 'react';
import { getMarkets } from '../api/buda.tsx';

const useCurrency = () => {
  const [markets, setMarkets] = useState<any>([]);

  const [availableBaseCurrencies, setAvailableBaseCurrencies] = useState<
    string[]
  >([]);
  const [availableQuoteCurrencies, setAvailableQuoteCurrencies] = useState<
    string[]
  >([]);

  const getCurrencies = useCallback(() => {
    const baseCurrencies = Array.from(
      new Set(markets?.map((market: any) => market.base_currency)),
    );
    const quoteCurrencies = Array.from(
      new Set(markets?.map((market: any) => market.quote_currency)),
    );

    return { baseCurrencies, quoteCurrencies };
  }, [markets]);

  useEffect(() => {
    const fetchMarkets = async () => {
      const { markets } = await getMarkets();
      setMarkets(markets);
    };

    fetchMarkets();
  }, []);

  useEffect(() => {
    if (markets) {
      const { baseCurrencies, quoteCurrencies } = getCurrencies();
      setAvailableBaseCurrencies(baseCurrencies);
      setAvailableQuoteCurrencies(quoteCurrencies);
    }
  }, [markets, getCurrencies]);

  return {
    availableBaseCurrencies,
    availableQuoteCurrencies,
  };
};

export default useCurrency;
