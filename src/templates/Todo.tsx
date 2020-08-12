import React from 'react';
import { TodayTask, TodoModal, TodoMenu, EditGroupName, GroupName } from '../components/todo';

class Todo extends React.Component {
  render() {
    return (
      <div>
        {/* <TodoMenu /> */}
        {/* <TodayTask /> */}
        <TodoModal createGroup={'グループ作成'} groupName={'グループ名'} />
        <GroupName />
      </div>
    );
  }
}

export default Todo;
