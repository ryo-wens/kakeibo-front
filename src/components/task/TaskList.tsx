import React from 'react';
import {
  GroupTasksList,
  GroupTasksListForEachUser,
  TasksListItem,
} from '../../reducks/groupTasks/types';
import '../../assets/task/task-list.scss';
import AddTaskNameFormContainer from '../../containers/task/modules/form/AddTaskNameFormContainer';
import TaskListItemComponentContainer from '../../containers/task/modules/listItem/TaskListItemComponentContainer';

interface TaskListProps {
  groupId: number;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  groupTasksList: GroupTasksList;
}

const TaskList = (props: TaskListProps) => {
  return (
    <>
      <div className="task-list">
        <h3 className="task-list__title">タスクリスト</h3>
        <ul className="task-list__items">
          {props.groupTasksList &&
            props.groupTasksList.map((listItem: TasksListItem) => {
              if (listItem.cycle_type === null) {
                return (
                  <div className="task-list__items--margin" key={listItem.id}>
                    <TaskListItemComponentContainer listItem={listItem} />
                  </div>
                );
              }
            })}
        </ul>
        <AddTaskNameFormContainer />
      </div>
    </>
  );
};

export default TaskList;
