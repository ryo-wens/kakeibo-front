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
  const [openInputTask, setOpenInputTask] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>('');

  const closeInputTask = useCallback(() => {
    setOpenInputTask(false);
    setTaskName('');
  }, [setOpenInputTask, setTaskName]);

  const inputTaskName = useCallback(
    (event) => {
      setTaskName(event.target.value as string);
    },
    [setTaskName]
  );

  const switchInputTask = () => {
    if (!openInputTask) {
      return (
        <button className="task-list__add-task-btn" onClick={() => setOpenInputTask(true)}>
          <AddIcon />
          タスクを追加
        </button>
      );
    } else if (openInputTask) {
      return (
        <>
          <InputTask
            buttonLabel={'追加'}
            groupId={props.groupId}
            inputTaskClose={closeInputTask}
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
                  <TaskListItem taskName={groupTaskListItem.task_name} />
                </div>
              );
            })}
        </ul>
        {switchInputTask()}
      </div>
    </>
  );
};

export default TaskList;
