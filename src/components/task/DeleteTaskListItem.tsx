import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ListItemText from '@material-ui/core/ListItemText';
import { TasksListItem } from '../../reducks/groupTasks/types';
import { TodoButton } from '../todo';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { deleteTaskItem } from '../../reducks/groupTasks/operations';

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
  const dispatch = useDispatch();

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
        <TodoButton
          label={'削除'}
          disabled={false}
          onClick={() =>
            dispatch(deleteTaskItem(props.taskListItem.group_id, props.taskListItem.id)) &&
            props.closeDeleteTask()
          }
        />
        <TodoButton label={'キャンセル'} disabled={false} onClick={() => props.closeDeleteTask()} />
      </div>
    </>
  );
};

export default DeleteTaskListItem;
