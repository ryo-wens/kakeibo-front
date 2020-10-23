import React, { useCallback, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TodoButton } from '../todo';
import { GroupTasksList, GroupTasksListForEachUser } from '../../reducks/groupTasks/types';
import { List } from '@material-ui/core';
import { DeleteTaskListItem, EditTaskListItem, InputTask, TaskListItemMenuButton } from './index';
import { AddButton } from '../uikit';
import { addTaskItem } from '../../reducks/groupTasks/operations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 400,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    listText: {
      display: `block`,
    },
  })
);

interface TaskListProps {
  groupId: number;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  groupTasksList: GroupTasksList;
}

const TaskList = (props: TaskListProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [openInputTask, setOpenInputTask] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>('');
  const [taskListItem, setTaskListItem] = useState<boolean>(true);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [deleteTask, setDeleteTask] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const openModal = useCallback(() => {
    setOpen(true);
    setTaskListItem(true);
  }, [setOpen]);

  const closeModal = useCallback(() => {
    setOpen(false);
    setEditTask(false);
    setDeleteTask(false);
  }, [setOpen, setEditTask, setDeleteTask]);

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

  const openEditTask = useCallback(() => {
    setTaskListItem(false);
    setEditTask(true);
  }, [setTaskListItem, setEditTask]);

  const closeEditTask = useCallback(() => {
    setTaskListItem(true);
    setEditTask(false);
    setTaskName(taskName);
  }, [setTaskListItem, setEditTask, setTaskName]);

  const openDeleteTask = useCallback(() => {
    setTaskListItem(false);
    setDeleteTask(true);
  }, [setTaskListItem, setDeleteTask]);

  const closeDeleteTask = useCallback(() => {
    setTaskListItem(true);
    setDeleteTask(false);
  }, [setTaskListItem, setDeleteTask]);

  const switchInputTask = () => {
    if (!openInputTask) {
      return <AddButton label={'タスクを追加'} onClick={() => setOpenInputTask(true)} />;
    } else if (openInputTask) {
      return (
        <>
          <h4>タスクを追加</h4>
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

  const selectedTaskId = (idx: number) => {
    setId(idx);
  };

  const TaskList = () => {
    const list = [];
    if (taskListItem) {
      for (let i = 0; i < props.groupTasksList.length; i++) {
        list.push(
          <div key={props.groupTasksList[i].id}>
            <li className={classes.listItem} onClick={() => selectedTaskId(i)}>
              <p className={classes.listText}>{props.groupTasksList[i].task_name}</p>
              <TaskListItemMenuButton
                openEditTaskListItem={openEditTask}
                openDeleteTask={openDeleteTask}
              />
            </li>
          </div>
        );
      }
    } else if (!taskListItem && editTask) {
      list.push(
        <EditTaskListItem
          key={props.groupTasksList[id].id}
          closeEditTask={closeEditTask}
          taskListItem={props.groupTasksList[id]}
        />
      );
    } else if (!taskListItem && deleteTask) {
      list.push(
        <DeleteTaskListItem
          key={props.groupTasksList[id].id}
          closeDeleteTask={closeDeleteTask}
          taskListItem={props.groupTasksList[id]}
        />
      );
    }
    return list;
  };

  const body = (
    <>
      {taskListItem ? (
        <div className={classes.paper}>
          <h3>タスクリスト</h3>
          <List>{props.groupTasksList && TaskList()}</List>
          {switchInputTask()}
        </div>
      ) : (
        <div className={classes.paper}>
          <List>{props.groupTasksList && TaskList()}</List>
        </div>
      )}
    </>
  );

  return (
    <div>
      <TodoButton label={'タスクリスト'} disabled={false} onClick={() => openModal()} />
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default TaskList;
