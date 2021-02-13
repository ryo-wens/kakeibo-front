import React from 'react';
import './today-schedule-task-area.scss';
import { UserTasksListItem } from '../../../../reducks/groupTasks/types';

interface TodayScheduleTaskAreaProps {
  userTaskListItem: UserTasksListItem;
  existAssignTask: boolean;
}

const TodayScheduleTaskArea = (props: TodayScheduleTaskAreaProps) => {
  return (
    <>
      {props.userTaskListItem && props.existAssignTask ? (
        props.userTaskListItem.tasks_list.map((listItem) => {
          return (
            <div className="today-schedule-task-area__item" key={listItem.id}>
              <span className="today-schedule-task-area__item-text">{listItem.task_name}</span>
            </div>
          );
        })
      ) : (
        <p className="today-schedule-task-area__message">割り当てられたタスクはありません。</p>
      )}
    </>
  );
};

export default TodayScheduleTaskArea;
