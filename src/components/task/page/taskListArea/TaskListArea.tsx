import React from 'react';
import { GroupTaskList, TaskListItem } from '../../../../reducks/groupTasks/types';
import './task-list-area.scss';
import AddTaskNameFormContainer from '../../../../containers/task/modules/form/AddTaskNameFormContainer';
import TaskListItemComponentContainer from '../../../../containers/task/modules/listItem/TaskListItemComponentContainer';

interface TaskListAreaProps {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  taskList: GroupTaskList;
}

const TaskListArea = (props: TaskListAreaProps) => {
  return (
    <div className="task-list-area">
      <h3 className="task-list-area__title">タスクリスト</h3>
      {props.taskList.length !== 0 ? (
        <div className="task-list-area__items">
          {props.taskList.map((listItem: TaskListItem) => {
            if (listItem.cycle_type === null) {
              return (
                <div className="task-list-area__item" key={listItem.id}>
                  <TaskListItemComponentContainer
                    setEditing={props.setEditing}
                    listItem={listItem}
                  />
                </div>
              );
            }
          })}
        </div>
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
