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
  timezone_str: string
) => {
  const start = new Date(
    startYear,
    startMonth,
    startDay,
    startHour,
    startMinute,
    timezone_str
  );
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
