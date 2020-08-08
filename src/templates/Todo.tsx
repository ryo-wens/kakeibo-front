import React from 'react';
import { TodoMenu } from '../components/header';
import { TodayTask, TodoModal, EditGroupName } from '../components/todo';

class Todo extends React.Component {
  render() {
    return (
      <div>
        {/* <TodoMenu /> */}
        {/* <TodayTask /> */}
        <TodoModal label={'グループ作成'} label2={'グループ名'} />
        <EditGroupName label={'グループ名を編集'} label2={'グループ名'} />
      </div>
    );
  }
}

export default Todo;
