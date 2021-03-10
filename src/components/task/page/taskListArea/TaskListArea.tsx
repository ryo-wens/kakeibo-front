import React from 'react';
import { GroupTaskList, TaskListItem } from '../../../../reducks/groupTasks/types';
import './task-list-area.scss';
import AddTaskNameFormContainer from '../../../../containers/task/modules/form/AddTaskNameFormContainer';
import TaskListItemComponentContainer from '../../../../containers/task/modules/listItem/TaskListItemComponentContainer';

interface TaskListAreaProps {
  taskList: GroupTaskList;
  handleStopPolling: (value: boolean) => void;
}

const TaskListArea = (props: TaskListAreaProps) => {
  return (
    <div className="task-list-area">
      <h3 className="task-list-area__title">タスクリスト</h3>
      {props.taskList.length !== 0 ? (
        <ul className="task-list-area__list">
          {props.taskList.map((listItem: TaskListItem) => {
            return (
              <TaskListItemComponentContainer
                handleStopPolling={props.handleStopPolling}
                listItem={listItem}
                key={listItem.id}
              />
            );
          })}
        </ul>
      ) : (
        <p className="task-list-area__message">タスクは登録されていません。</p>
      )}
      <div className="task-list-area__add-task-btn">
        <AddTaskNameFormContainer />
      </div>
    </div>
  );
};

export default TaskListArea;
