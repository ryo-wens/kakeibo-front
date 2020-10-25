export const dateStringToDate = (date: string) => {
  const prevDates = date.split(/[/()]/, 3);
  const prevYear = Number(prevDates[0]);
  const prevMonth = Number(prevDates[1]) - 1;
  const prevDate = Number(prevDates[2]);
  return new Date(prevYear, prevMonth, prevDate);
};

export const dateToDateString = (date: Date) => {
  const year = String(date.getFullYear());
  const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const _date: string = ('0' + date.getDate()).slice(-2);
  const day: string = getWeekDay(date);
  return `${year}/${month}/${_date}(${day})`;
};

export const getEarlyOfMonthDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth());
};

export const getEndOfMonthDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getWeekStartDate = (date: Date) => {
  const weekDay = date.getDay();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - weekDay);
};

export const getWeekDay = (date: Date) => {
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  return weekdays[date.getDay()];
};
