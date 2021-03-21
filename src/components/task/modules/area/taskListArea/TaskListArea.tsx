import React from 'react';
import { GroupTaskList, TaskListItem } from '../../../../../reducks/groupTasks/types';
import styles from './TaskListArea.module.scss';
import AddTaskNameFormContainer from '../../../../../containers/task/modules/form/AddTaskNameFormContainer';
import TaskListItemComponentContainer from '../../../../../containers/task/modules/listItem/TaskListItemComponentContainer';

interface TaskListAreaProps {
  taskList: GroupTaskList;
  handleStopPolling: (value: boolean) => void;
}

const TaskListArea = (props: TaskListAreaProps) => {
  const existsTaskList = props.taskList.length !== 0;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>タスクリスト</h3>
      {existsTaskList ? (
        <ul className={styles.list}>
          {props.taskList.map((listItem: TaskListItem) => {
            return (
              <TaskListItemComponentContainer
                handleStopPolling={props.handleStopPolling}
                listItem={listItem}
                listItemClassName={styles.childListItem}
                formClassName={styles.childForm}
                key={listItem.id}
              />
            );
          })}
        </ul>
      ) : (
        <p className={styles.message}>タスクは登録されていません。</p>
      )}
      <div className={styles.addTaskBtn}>
        <AddTaskNameFormContainer />
      </div>
    </div>
  );
};

export default TaskListArea;
