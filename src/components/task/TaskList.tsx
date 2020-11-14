import React, { useCallback, useState } from 'react';
import {
  GroupTasksList,
  GroupTasksListForEachUser,
  TasksListItem,
} from '../../reducks/groupTasks/types';
import { InputTask, TaskListItem } from './index';
import AddIcon from '@material-ui/icons/Add';
import { addTaskItem } from '../../reducks/groupTasks/operations';
import '../../assets/task/task-list.scss';

interface TaskListProps {
  groupId: number;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  groupTasksList: GroupTasksList;
}

const TaskList = (props: TaskListProps) => {
  const [openAddTask, setOpenAddTask] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>('');

  const openAddInputTask = useCallback(() => {
    setOpenAddTask(true);
  }, [setOpenAddTask]);

  const closeAddInputTask = useCallback(() => {
    setOpenAddTask(false);
    setTaskName('');
  }, [setOpenAddTask, setTaskName]);

  const inputTaskName = useCallback(
    (event) => {
      setTaskName(event.target.value as string);
    },
    [setTaskName]
  );

  const switchAddInputTask = () => {
    if (!openAddTask) {
      return (
        <button className="task-list__add-task-btn" onClick={openAddInputTask}>
          <AddIcon />
          タスクを追加
        </button>
      );
    } else if (openAddTask) {
      return (
        <>
          <InputTask
            buttonLabel={'追加'}
            titleLabel={'追加'}
            groupId={props.groupId}
            inputTaskClose={closeAddInputTask}
            inputTaskName={inputTaskName}
            noDifferenceTaskName={false}
            operation={addTaskItem(props.groupId, taskName)}
            taskName={taskName}
          />
        </>
      );
    }
  };

  return (
    <>
      <div className="task-list">
        <h3 className="task-list__title">タスクリスト</h3>
        <ul>
          {props.groupTasksList &&
            props.groupTasksList.map((groupTaskListItem: TasksListItem) => {
              return (
                <div key={groupTaskListItem.id}>
                  <TaskListItem
                    taskListItem={groupTaskListItem}
                    taskName={taskName}
                    inputTaskName={inputTaskName}
                    setTaskName={setTaskName}
                  />
                </div>
              );
            })}
        </ul>
        {switchAddInputTask()}
      </div>
    </>
  );
};

export default TaskList;
