import {
  DAILY,
  WEEKLY,
  MONTHLY,
  CryptoCurrency,
  FiatCurrency,
} from "./constants.tsx";

export const convertToMilleseconds = (
  startYear: number,
  startMonth: number,
  startDay: number,
  startHour: number,
  startMinute: number,
  endYear: number,
  endMonth: number,
  endDay: number,
  endHour: number,
  endMinute: number
): [number, number] => {
  const start = new Date(
    startYear,
    startMonth - 1,
    startDay,
    startHour,
    startMinute
  );
  const end = new Date(endYear, endMonth - 1, endDay, endHour, endMinute);

  // Santiago de Chile timezone offset
  const timezoneOffset = -3 * 60 * 60000;

  const startWithTimezone = new Date(start.getTime() + timezoneOffset);
  const endWithTimezone = new Date(end.getTime() + timezoneOffset);

  const timestampStartMilliseconds = startWithTimezone.getTime();
  const timestampEndMilliseconds = endWithTimezone.getTime();

  return [timestampStartMilliseconds, timestampEndMilliseconds];
};

export const separateCryptoAndFiat = (currencies: string[]) => {
  const cryptoCurrencies: CryptoCurrency[] = [
    "BTC",
    "ETH",
    "BCH",
    "LTC",
    "USDC",
    "USDT",
  ];
  const fiatCurrencies: FiatCurrency[] = ["CLP", "COP", "PEN", "ARS", "USD"];

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

// Function to get the timestamps between two dates

export const getTimestamps = (
  startDate: string,
  endDate: string,
  frequency: string
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const timestamps: Array<number> = [];

  if (frequency === DAILY) {
    for (
      let date = new Date(start);
      date < end;
      date.setDate(date.getDate() + 1)
    ) {
      timestamps.push(date.getTime());
    }
  } else if (frequency === WEEKLY) {
    for (
      let date = new Date(start);
      date < end;
      date.setDate(date.getDate() + 7)
    ) {
      timestamps.push(date.getTime());
    }
  } else if (frequency === MONTHLY) {
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

export const convertTimestampsToSantiagoTime = (
  timestamps: number[]
): Date[] => {
  const MILLIS_PER_HOUR = 60 * 60 * 1000;
  const santiagoTimezoneOffset = -3 * MILLIS_PER_HOUR;

  if (!timestamps || !timestamps.length || timestamps.some(isNaN)) {
    throw new Error("Invalid timestamps provided");
  }

  const santiagoTimeDates: Date[] = [];

  timestamps.forEach((timestamp) => {
    const date = new Date(timestamp + santiagoTimezoneOffset);
    const santiagoDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    santiagoTimeDates.push(santiagoDate);
  });

  return santiagoTimeDates;
};

export const formatNumberToCLP = (number: number) => {
  const parts = number.toString().split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const decimalPart = parts[1] ? `,${parts[1]}` : "";
  return `$${integerPart}${decimalPart}`;
};

export const frecuencyMap = {
  daily: "Diaria",
  weekly: "Semanal",
  monthly: "Mensual",
};

// Function to format a date string to "DD-MM-YY" format
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};
