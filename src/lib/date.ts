import { year, month, customMonth } from './constant';

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

export const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth());
};

export const getLastDayOfMonth = (date: Date) => {
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

export interface WeeklyInfo {
  startDate: number;
  endDate: number;
}
export type Weeks = Array<WeeklyInfo>;

export const displayWeeks = () => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  const endDayCount = endDate.getDate();
  let currentDayOfWeek = startDate.getDay();
  const prevWeeks: Weeks = [];
  for (let i = 1; i <= endDayCount; ) {
    const weeklyInfo: WeeklyInfo = {
      startDate: 0,
      endDate: 0,
    };

    if (i === 1) {
      weeklyInfo.startDate = 1;
      weeklyInfo.endDate = 7 - currentDayOfWeek;
      prevWeeks.push(weeklyInfo);

      i += weeklyInfo.endDate;
      currentDayOfWeek = 0;

      continue;
    } else if (i + 6 >= endDayCount) {
      weeklyInfo.startDate = i;
      weeklyInfo.endDate = endDayCount;
      prevWeeks.push(weeklyInfo);

      break;
    }

    weeklyInfo.startDate = i;
    weeklyInfo.endDate = i + 6;
    prevWeeks.push(weeklyInfo);
    i += 7;
  }

  return prevWeeks;
};

export const weekDays = (startDay: number, endDay: number) => {
  const oneWeekDays: string[] = [];

  for (let i = startDay; i <= endDay; i++) {
    oneWeekDays.push(customMonth + '月' + i + '日');
  }

  return oneWeekDays;
};
