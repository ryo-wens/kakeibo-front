import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ListItemText from '@material-ui/core/ListItemText';
import { TasksListItem } from '../../reducks/groupTasks/types';
import { TodoButton } from '../todo';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    buttons: {
      display: 'flex',
    },
  })
);

interface DeleteTaskListItemProps {
  closeDeleteTask: () => void;
  taskListItem: TasksListItem;
}

const DeleteTaskListItem = (props: DeleteTaskListItemProps) => {
  const classes = useStyles();

  return (
    <>
      <ListItem button={true} onClick={() => props.closeDeleteTask()}>
        <ListItemIcon>
          <ArrowBackIosIcon />
        </ListItemIcon>
        <ListItemText secondary={'タスクリストへ戻る'} />
      </ListItem>
      <h4>タスクを削除</h4>
      <p>{props.taskListItem.task_name}を削除しますか？</p>
      <div className={classes.buttons}>
        <TodoButton label={'削除'} disabled={false} onClick={() => console.log('d')} />
        <TodoButton label={'キャンセル'} disabled={false} onClick={() => console.log('d')} />
      </div>
    </>
  );
};

export default DeleteTaskListItem;
