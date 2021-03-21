import React from 'react';
import styles from './TodayScheduleTaskArea.module.scss';
import { TaskListItem } from '../../../../reducks/groupTasks/types';

interface TodayScheduleTaskAreaProps {
  todayUserTaskList: TaskListItem[] | undefined;
  existsTodayUserTaskList: boolean | undefined;
}

const TodayScheduleTaskArea = (props: TodayScheduleTaskAreaProps) => {
  return (
    <>
      {props.todayUserTaskList && props.existsTodayUserTaskList ? (
        props.todayUserTaskList.map((listItem) => {
          return (
            <div className={styles.item} key={listItem.id}>
              <span className={styles.itemText}>{listItem.task_name}</span>
            </div>
          );
        })
      ) : (
        <p className={styles.message}>割り当てられたタスクはありません。</p>
      )}
    </>
  );
};

export default TodayScheduleTaskArea;
