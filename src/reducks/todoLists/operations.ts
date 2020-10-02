import { Dispatch, Action } from 'redux';
import { State } from '../store/types';
import axios from 'axios';
import { createTodoListItemAction, fetchDateTodoListsAction } from './actions';
import {
  createTodoListItemReq,
  createTodoListItemRes,
  fetchTodayTodoListsRes,
  TodoListItem,
  TodoLists,
} from './types';
import { push } from 'connected-react-router';

export const createTodoListItem = (
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

    const data: createTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
    };

    await axios
      .post<createTodoListItemRes>('http://127.0.0.1:8082/todo-list', JSON.stringify(data), {
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

        dispatch(createTodoListItemAction(newImplementationTodoLists, newDueTodoLists));
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

export const fetchDateTodoLists = (year: string, month: string, date: string) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get<fetchTodayTodoListsRes>(`http://127.0.0.1:8082/todo-list/${year}-${month}-${date}`, {
        withCredentials: true,
      })
      .then((res) => {
        const implementationTodoLists = res.data.implementation_todo_list;
        const dueTodoLists = res.data.due_todo_list;
        const message = res.data.message;

        if (implementationTodoLists !== undefined && dueTodoLists !== undefined) {
          const message = '';
          dispatch(fetchDateTodoListsAction(implementationTodoLists, dueTodoLists, message));
        } else {
          const implementationTodoLists: TodoLists = [];
          const dueTodoLists: TodoLists = [];
          dispatch(fetchDateTodoListsAction(implementationTodoLists, dueTodoLists, message));
        }
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