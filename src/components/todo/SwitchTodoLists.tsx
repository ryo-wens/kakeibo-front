import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ExistsTodoLists } from './index';
import { TodoLists } from '../../reducks/todoLists/types';
import { GroupTodoLists } from '../../reducks/groupTodoLists/types';

interface SwitchTodoListsProps {
  implementationTodoLists: TodoLists | GroupTodoLists;
  dueTodoLists: TodoLists | GroupTodoLists;
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
          todoLists={props.implementationTodoLists}
          implementationTodoLists={props.implementationTodoLists}
          dueTodoLists={props.dueTodoLists}
          todoListsMessage={props.todoListsMessage}
        />
      ) : (
        <ExistsTodoLists
          planName={'締切予定'}
          todoLists={props.dueTodoLists}
          implementationTodoLists={props.implementationTodoLists}
          dueTodoLists={props.dueTodoLists}
          todoListsMessage={props.todoListsMessage}
        />
      )}
    </>
  );
};
export default SwitchTodoLists;
