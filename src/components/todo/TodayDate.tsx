import React from 'react';
import { AddTodo, TodoListItem } from './index';

const TodayDate = () => {
  const dt: Date = new Date();
  const month = dt.getMonth() + 1;
  const date = dt.getDate();
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = weekdays[dt.getDay()];
  const groupId = 0;

  return (
    <>
      <span>
        今日 {month}/{date} ({weekday})
      </span>
      <TodoListItem />
      <div>
        <AddTodo groupId={groupId} />
      </div>
    </>
  );
};

export default TodayDate;
