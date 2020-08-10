import React from 'react';
import { TodoMenu } from '../components/Todo';
import { TodayTask, TodoModal, EditGroupName } from '../components/todo';

class Todo extends React.Component {
  render() {
    return (
      <div>
        {/* <TodoMenu /> */}
        {/* <TodayTask /> */}
        <TodoModal createGroup={'グループ作成'} groupName={'グループ名'} />
        <EditGroupName editGroupName={'グループ名を編集'} groupName={'グループ名'} />
      </div>
    );
  }
}

export default Todo;
