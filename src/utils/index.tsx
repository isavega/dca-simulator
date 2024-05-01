import {
  DAILY,
  WEEKLY,
  MONTHLY,
  CryptoCurrency,
  FiatCurrency,
} from './constants.tsx';

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
  endMinute: number,
): [number, number] => {
  const start = new Date(
    startYear,
    startMonth - 1,
    startDay,
    startHour,
    startMinute,
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

export const separateCryptoAndFiat = (
  currencies: string[],
): { crypto: string[]; fiat: string[] } => {
  const cryptoCurrenciesSet = new Set<CryptoCurrency>([
    'BTC',
    'ETH',
    'BCH',
    'LTC',
    'USDC',
    'USDT',
  ]);
  const fiatCurrenciesSet = new Set<FiatCurrency>([
    'CLP',
    'COP',
    'PEN',
    'ARS',
    'USD',
  ]);

  const cryptoList: string[] = [];
  const fiatList: string[] = [];

  currencies?.forEach((currency) => {
    if (
      cryptoCurrenciesSet.has(currency as CryptoCurrency) &&
      !cryptoList.includes(currency)
    ) {
      cryptoList.push(currency);
    } else if (
      fiatCurrenciesSet.has(currency as FiatCurrency) &&
      !fiatList.includes(currency)
    ) {
      fiatList.push(currency);
    }
  });

  return { crypto: cryptoList, fiat: fiatList };
};

// Function to get the timestamps between two dates
export const getTimestamps = (
  startDate: string,
  endDate: string,
  frequency: string,
): number[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Set time to 12:00:00 for Santiago de Chile (CLST, UTC-3)
  start.setUTCHours(16, 0, 0);
  end.setUTCHours(16, 0, 0);

  const timestamps: number[] = [];
  let currentDate = new Date(start);

  const isEndReached = (current: Date, target: Date): boolean => {
    return current.getTime() >= target.getTime();
  };

  while (!isEndReached(currentDate, end)) {
    timestamps.push(currentDate.getTime());
    if (frequency === DAILY) {
      currentDate.setDate(currentDate.getDate() + 1);
    } else if (frequency === WEEKLY) {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (frequency === MONTHLY) {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  timestamps.push(end.getTime());
  return timestamps;
};

export const convertTimestampsToSantiagoTime = (
  timestamps: number[],
): Date[] => {
  const MILLIS_PER_HOUR = 60 * 60 * 1000;
  const santiagoTimezoneOffset = -3 * MILLIS_PER_HOUR;

  if (!timestamps || !timestamps.length || timestamps.some(isNaN)) {
    throw new Error('Invalid timestamps provided');
  }

  const santiagoTimeDates: Date[] = [];

  timestamps.forEach((timestamp) => {
    const date = new Date(timestamp + santiagoTimezoneOffset);
    const santiagoDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    santiagoTimeDates.push(santiagoDate);
  });

  return santiagoTimeDates;
};

export const formatNumberToCLP = (number: number, simbol: boolean = true) => {
  const parts = number.toString().split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimalPart = parts[1] ? `,${parts[1]}` : '';
  if (simbol) {
    return `$${integerPart}${decimalPart}`;
  }
  return `${integerPart}${decimalPart}`;
};

export const frecuencyMap = {
  daily: 'Diaria',
  weekly: 'Semanal',
  monthly: 'Mensual',
};

// Function to format a date string from "YYYY-MM-DD" to "DD-MM-YYYY" format
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const formatDateCalendar = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const formatDateToISO = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
