import React from 'react';
import 'date-fns';
import { TaskTextFields, TodayDate } from './index';
import { AddButton } from '../uikit';

const TodayTask = () => {
  return (
    <>
      <TodayDate />
      <AddButton label={'タスクを追加'} onClick={() => false} />
      <TaskTextFields />
    </>
  );
};

export default TodayTask;
