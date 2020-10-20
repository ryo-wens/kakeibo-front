import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TodoButton } from '../todo';
import { GroupTasksList, GroupTasksListForEachUser } from '../../reducks/groupTasks/types';
import { List, ListItemText } from '@material-ui/core';

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

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <h3>タスクリスト</h3>
      <List>
        {props.groupTasksList &&
          props.groupTasksList.map((taskListItem) => {
            return (
              <li key={taskListItem.id}>
                <p className={classes.listText}>{taskListItem.task_name}</p>
                <ListItemText secondary={`サイクルタイプ: ${taskListItem.cycle_type}`} />
                <ListItemText secondary={`サイクル: ${taskListItem.cycle}`} />
              </li>
            );
          })}
      </List>
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
