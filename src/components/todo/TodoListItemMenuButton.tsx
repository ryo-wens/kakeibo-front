import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton } from '@material-ui/core';
import { GenericModal } from '../uikit';
import { useDispatch } from 'react-redux';
import { deleteTodoListItem } from '../../reducks/todoLists/operations';
import { TodoListItem } from '../../reducks/todoLists/types';

interface TodoListItemMenuButtonProps {
  openInputTodoList: () => void;
  todoListItem: TodoListItem;
}

const TodoListItemMenuButton = (props: TodoListItemMenuButtonProps) => {
  const dispatch = useDispatch();
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
        <MenuItem onClick={() => props.openInputTodoList()}>Todoを編集</MenuItem>
        <GenericModal
          dispatch={() => dispatch(deleteTodoListItem(props.todoListItem.id))}
          menuLabel={'Todoを削除'}
          modalText={`${props.todoListItem.todo_content}を削除しますか？`}
          buttonLabel={'削除'}
        />
      </Menu>
    </>
  );
};

export default TodoListItemMenuButton;
