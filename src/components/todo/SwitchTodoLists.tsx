import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ExistsTodoLists } from './index';
import { TodoLists } from '../../reducks/todoLists/types';
import { GroupTodoLists } from '../../reducks/groupTodoLists/types';

interface SwitchTodoListsProps {
  implementationTodoList: TodoLists | GroupTodoLists;
  dueTodoList: TodoLists | GroupTodoLists;
  todoListsMessage: string;
}

const SwitchTodoLists = (props: SwitchTodoListsProps) => {
  const [value, setValue] = useState<number>(0);

  const switchTab = (event: React.ChangeEvent<unknown>, value: number) => {
    setValue(value);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={switchTab}>
          <Tab label="実施予定のTodo" value={0} />
          <Tab label="締切予定のTodo" value={1} />
        </Tabs>
      </AppBar>
      {value === 0 ? (
        <ExistsTodoLists
          planName={'実施予定'}
          todoList={props.implementationTodoList}
          implementationTodoList={props.implementationTodoList}
          dueTodoList={props.dueTodoList}
          todoListsMessage={props.todoListsMessage}
        />
      ) : (
        <ExistsTodoLists
          planName={'締切予定'}
          todoList={props.dueTodoList}
          implementationTodoList={props.implementationTodoList}
          dueTodoList={props.dueTodoList}
          todoListsMessage={props.todoListsMessage}
        />
      )}
    </>
  );
};
export default SwitchTodoLists;
