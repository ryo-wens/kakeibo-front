import { Dispatch, Action } from 'redux';
import { State } from '../store/types';
import axios from 'axios';
import { createTodoAction } from './actions';
import { createTodoReq, createTodoRes, TodoListItem, TodoLists } from './types';
import { push } from 'connected-react-router';

export const createTodo = (
  implementationDate: Date | null,
  dueDate: Date | null,
  todoContent: string
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (implementationDate === null) {
      return;
    }
    if (dueDate === null) {
      return;
    }
    if (todoContent === '') {
      return;
    }

    const data: createTodoReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
    };

    await axios
      .post<createTodoRes>('http://127.0.0.1:8082/todo-list', JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
        const prevImplementationTodoLists: TodoLists = getState().todoLists.implementationTodoLists;
        const prevDueTodoLists: TodoLists = getState().todoLists.dueTodoLists;

        const todoListItem: TodoListItem = res.data;

        const newImplementationTodoLists: TodoLists = [
          ...prevImplementationTodoLists,
          todoListItem,
        ];
        const newDueTodoLists: TodoLists = [...prevDueTodoLists, todoListItem];

        dispatch(createTodoAction(newImplementationTodoLists, newDueTodoLists));
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return alert(error.response.data.error.message[0]);
        }

        if (error.response.status === 401) {
          alert(error.response.data.error.message);
          dispatch(push('/login'));
        }

        if (error.response.status === 500) {
          alert(error.response.data.error.message);
        }
      });
  };
};
