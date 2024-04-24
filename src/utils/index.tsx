export const convertToMilleseconds = (
  startYear: number,
  startMonth: number,
  startDay: number,
  endYear: number,
  endMonth: number,
  endDay: number,
  endHour: number,
  endMinute: number
) => {
  const start = new Date(startYear, startMonth, startDay, 12, 0);
  const end = new Date(endYear, endMonth, endDay, endHour, endMinute);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const startWithTimezone = new Date(
    start.toLocaleString("en-US", { timeZone: timezone })
  );
  const endWithTimezone = new Date(
    end.toLocaleString("en-US", { timeZone: timezone })
  );

  const timestampStartSeconds = Math.floor(startWithTimezone.getTime() / 1000);
  const timestampEndSeconds = Math.floor(endWithTimezone.getTime() / 1000);

  const timestampStartMilliseconds = timestampStartSeconds * 1000;
  const timestampEndMilliseconds = timestampEndSeconds * 1000;

  return [timestampStartMilliseconds, timestampEndMilliseconds];
};

type CryptoCurrency = "BTC" | "ETH" | "BCH" | "LTC" | "USDC" | "USDT";
type FiatCurrency = "CLP" | "COP" | "PEN" | "ARS";

export const separateCryptoAndFiat = (currencies: string[]) => {
  const cryptoCurrencies: CryptoCurrency[] = [
    "BTC",
    "ETH",
    "BCH",
    "LTC",
    "USDC",
    "USDT",
  ];
  const fiatCurrencies: FiatCurrency[] = ["CLP", "COP", "PEN", "ARS"];

  const cryptoList: string[] = [];
  const fiatList: string[] = [];

  currencies?.forEach((currency) => {
    if (cryptoCurrencies.includes(currency as CryptoCurrency)) {
      cryptoList.push(currency);
    } else if (fiatCurrencies.includes(currency as FiatCurrency)) {
      fiatList.push(currency);
    }
  });

  return { crypto: cryptoList, fiat: fiatList };
};

// funcion que recibe una fecha inicial, una fecha final y una frecuencia y retorna un arreglo con los timestamps de cada fecha en la frecuencia

export const getTimestamps = (
  startDate: string,
  endDate: string,
  frequency: string
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const timestamps: Array<number> = [];

  if (frequency === "daily") {
    for (
      let date = new Date(start);
      date < end;
      date.setDate(date.getDate() + 1)
    ) {
      timestamps.push(date.getTime());
    }
  } else if (frequency === "weekly") {
    for (
      let date = new Date(start);
      date < end;
      date.setDate(date.getDate() + 7)
    ) {
      timestamps.push(date.getTime());
    }
  } else if (frequency === "monthly") {
    for (
      let date = new Date(start);
      date < end;
      date.setMonth(date.getMonth() + 1)
    ) {
      timestamps.push(date.getTime());
    }
  }

  return timestamps;
};
