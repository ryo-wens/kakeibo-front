import { TodoList } from './types';
export type todoListsActions = ReturnType<typeof createTodoAction>;

export const CREATE_TODO = 'CREATE_TODO';
export const createTodoAction = (implementationTodoList: TodoList, dueTodoList: TodoList) => {
  return {
    type: CREATE_TODO,
    payload: {
      implementationTodoList: implementationTodoList,
      dueTodoList: dueTodoList,
    },
  };
};
