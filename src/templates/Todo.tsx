import React from 'react';
import { TodoMenu } from '../components/header';
import { TodayTask } from '../components/Todo';

class Todo extends React.Component {
  render() {
    return (
      <div>
        {/* <TodoMenu /> */}
        <TodayTask />
      </div>
    );
  }
}

export default Todo;
