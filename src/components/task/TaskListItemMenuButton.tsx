import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton } from '@material-ui/core';

interface TaskListItemMenuButtonProps {
  openEditTaskListItem: () => void;
  openDeleteTask: () => void;
}

const TaskListItemMenuButton = (props: TaskListItemMenuButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={props.openEditTaskListItem}>タスクを編集</MenuItem>
        <MenuItem onClick={props.openDeleteTask}>タスクを削除</MenuItem>
      </Menu>
    </>
  );
};

export default TaskListItemMenuButton;
