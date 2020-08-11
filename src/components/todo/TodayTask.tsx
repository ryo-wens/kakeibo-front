import React from 'react';
import 'date-fns';
import { AddButton, TaskTextFields, TodayDate } from './index';

const TodayTask = () => {
  return (
    <React.Fragment>
      <TodayDate />
      <AddButton label={'タスクを追加'} />
      <TaskTextFields />
    </React.Fragment>
  );
};

export default TodayTask;
