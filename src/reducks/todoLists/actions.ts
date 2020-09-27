import { TodoLists } from './types';
export type todoListsActions = ReturnType<typeof createTodoAction>;

export const CREATE_TODO = 'CREATE_TODO';
export const createTodoAction = (implementationTodoList: TodoLists, dueTodoList: TodoLists) => {
  return {
    type: CREATE_TODO,
    payload: {
      implementationTodoLists: implementationTodoList,
      dueTodoLists: dueTodoList,
    },
  };
};
