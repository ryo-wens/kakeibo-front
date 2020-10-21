import React, { useCallback, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TodoButton } from '../todo';
import { GroupTasksList, GroupTasksListForEachUser } from '../../reducks/groupTasks/types';
import { List } from '@material-ui/core';
import { InputTask, TaskListItemMenuButton } from './index';
import { AddButton } from '../uikit';

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
  groupTasksListForEachUser: GroupTasksListForEachUser;
  groupTasksList: GroupTasksList;
}

const TaskList = (props: TaskListProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [openInputTask, setOpenInputTask] = useState<boolean>(false);
  const [taskContent, setTaskContent] = useState<string>('');

  const openModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const closeInputTask = useCallback(() => {
    setOpenInputTask(false);
    setTaskContent('');
  }, [setOpenInputTask, setTaskContent]);

  const inputTaskContent = useCallback(
    (event) => {
      setTaskContent(event.target.value as string);
    },
    [setTaskContent]
  );

  const switchInputTask = () => {
    if (!openInputTask) {
      return <AddButton label={'タスクを追加'} onClick={() => setOpenInputTask(true)} />;
    } else if (openInputTask) {
      return (
        <InputTask
          buttonLabel={'追加'}
          inputTaskClose={closeInputTask}
          taskContent={taskContent}
          inputTaskContent={inputTaskContent}
        />
      );
    }
  };

  const body = (
    <div className={classes.paper}>
      <h3>タスクリスト</h3>
      <List>
        {props.groupTasksList &&
          props.groupTasksList.map((taskListItem) => {
            return (
              <li key={taskListItem.id}>
                <div className={classes.listItem}>
                  <p className={classes.listText}>{taskListItem.task_name}</p>
                  <TaskListItemMenuButton />
                </div>
              </li>
            );
          })}
      </List>
      {switchInputTask()}
    </div>
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
