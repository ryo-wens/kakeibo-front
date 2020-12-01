import { customMonth, year } from './constant';

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

export const dateStringToMonthString = (date: string) => {
  const prevDates = date.split(/[/()]/, 2);
  return `${prevDates[0]}/${prevDates[1]}`;
};

export const dateToYearAndMonthString = (date: Date) => {
  const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
  return `${date.getFullYear()}/${month}`;
};

export const dateToYearString = (date: Date) => {
  return `${date.getFullYear()}`;
};

export const dateToMonthString = (date: Date) => {
  return `${date.getMonth() + 1}`;
};

export const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth());
};

export const getLastDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getFirstDayOfNextMonth = (date: Date) => {
  const endOfMonthDate = getLastDayOfMonth(date);
  const remainingDatesUntilNextMonth = endOfMonthDate.getDate() - date.getDate();
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + remainingDatesUntilNextMonth + 1
  );
};

export const getLastDayOfPrevMonth = (date: Date) => {
  const earlyOfMonthDate = getFirstDayOfMonth(date);
  const remainingDatesUntilPrevMonth = date.getDate() - earlyOfMonthDate.getDate();
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - remainingDatesUntilPrevMonth - 1
  );
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

export const displayWeeks = (year: number, month: number) => {
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

export const selectedDate = (startDay: number, endDay: number): Date[] => {
  const selectedDays: Date[] = [];

  for (let i = startDay; i <= endDay; i++) {
    selectedDays.push(new Date(year + '/' + customMonth + '/' + i));
  }

  return selectedDays;
};

export interface SelectYears {
  selectedYear: string;
  selectedMonth: string;
}

export const prevSelectYears = (selectedYear: number, selectedMonth: number): SelectYears => {
  const nextMonth = selectedMonth - 1;

  if (nextMonth === 0) {
    return {
      selectedYear: String(selectedYear - 1),
      selectedMonth: '12',
    };
  } else if (nextMonth <= 9) {
    return {
      selectedYear: String(selectedYear),
      selectedMonth: '0' + nextMonth,
    };
  } else {
    return {
      selectedYear: String(selectedYear),
      selectedMonth: String(nextMonth),
    };
  }
};

export const nextSelectYears = (selectedYear: number, selectedMonth: number): SelectYears => {
  const nextMonth = selectedMonth + 1;

  if (nextMonth === 13) {
    return {
      selectedYear: String(selectedYear + 1),
      selectedMonth: '01',
    };
  } else if (nextMonth <= 9) {
    return {
      selectedYear: String(selectedYear),
      selectedMonth: '0' + nextMonth,
    };
  } else {
    return {
      selectedYear: String(selectedYear),
      selectedMonth: String(nextMonth),
    };
  }
};

export interface BaseYear {
  selectedYear: boolean;
  selectedMonth: boolean;
}

export const prevButtonDisable = (selectedYear: number, selectedMonth: number) => {
  const minimumBaseYear = year - 3;

  return selectedYear === minimumBaseYear && selectedMonth === 1;
};

export const nextButtonDisable = (selectedYear: number, selectedMonth: number) => {
  const maximumBaseYear = year + 3;

  return selectedYear === maximumBaseYear && selectedMonth === 12;
};
