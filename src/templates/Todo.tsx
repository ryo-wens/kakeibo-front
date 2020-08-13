import React from 'react';
import { TodayTask, CreateGroups, TodoMenu, EditGroupName, GroupName } from '../components/todo';

class Todo extends React.Component {
  render() {
    return (
      <div>
        {/* <TodoMenu /> */}
        {/* <TodayTask /> */}
        <CreateGroups createGroup={'グループ作成'} groupName={'グループ名'} />
        <GroupName />
      </div>
    );
  }
}

export default Todo;
