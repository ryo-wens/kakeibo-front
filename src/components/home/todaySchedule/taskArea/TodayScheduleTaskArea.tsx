import React from 'react';
import styles from './TodayScheduleTaskArea.module.scss';
import { UserTaskListItem } from '../../../../reducks/groupTasks/types';

interface TodayScheduleTaskAreaProps {
  userTaskListItem: UserTaskListItem | undefined;
  existAssignTask: boolean | undefined;
}

const TodayScheduleTaskArea = (props: TodayScheduleTaskAreaProps) => {
  return (
    <>
      {props.userTaskListItem && props.existAssignTask ? (
        props.userTaskListItem.tasks_list.map((listItem) => {
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
