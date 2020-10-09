import { Action, Dispatch } from 'redux';
import { State } from '../store/types';
import axios from 'axios';
import {
  createTodoListItemAction,
  deleteTodoListItemAction,
  editTodoListItemAction,
  fetchDateTodoListsAction,
  fetchMonthTodoListsAction,
} from './actions';
import {
  createTodoListItemReq,
  createTodoListItemRes,
  deleteTodoListItemRes,
  editTodoListItemRes,
  fetchMonthTodoListsRes,
  fetchTodayTodoListsRes,
  TodoListItem,
  TodoLists,
} from './types';
import { push } from 'connected-react-router';
import moment from 'moment';
import { openTextModalAction } from '../modal/actions';

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
      .post<createTodoListItemRes>(
        'http://127.0.0.1:8082/todo-list',
        JSON.stringify(data, function (key, value) {
          if (key === 'implementation_date') {
            return moment(value).format();
          } else if (key === 'due_date') {
            return moment(value).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      )
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

export const editTodoListItem = (
  todoListItemId: number,
  implementationDate: Date | null,
  dueDate: Date | null,
  todoContent: string,
  completeFlag: boolean
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

    const data = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: completeFlag,
    };

    await axios
      .put<editTodoListItemRes>(
        `http://127.0.0.1:8082/todo-list/${todoListItemId}`,
        JSON.stringify(data, function (key, value) {
          if (key === 'implementation_date') {
            return moment(value).format();
          } else if (key === 'due_date') {
            return moment(value).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const prevImplementationTodoLists: TodoLists = getState().todoLists.implementationTodoLists;
        const prevDueTodoLists: TodoLists = getState().todoLists.dueTodoLists;

        const updateTodoLists = (prevTodoLists: TodoLists) => {
          return prevTodoLists.map((prevTodoList: TodoListItem) => {
            if (prevTodoList.id === todoListItemId) {
              const updateTodoListItem: TodoListItem = res.data;
              return updateTodoListItem;
            } else {
              return prevTodoList;
            }
          });
        };

        const updateImplementationTodoLists: TodoLists = updateTodoLists(
          prevImplementationTodoLists
        );
        const updateDueTodoLists: TodoLists = updateTodoLists(prevDueTodoLists);

        dispatch(editTodoListItemAction(updateImplementationTodoLists, updateDueTodoLists));
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

export const fetchMonthTodoLists = (year: string, month: string) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get<fetchMonthTodoListsRes>(`http://127.0.0.1:8082/todo-list/${year}-${month}`, {
        withCredentials: true,
      })
      .then((res) => {
        const implementationTodoLists = res.data.implementation_todo_list;
        const dueTodoLists = res.data.due_todo_list;
        const message = res.data.message;

        if (implementationTodoLists !== undefined && dueTodoLists !== undefined) {
          const message = '';
          dispatch(fetchMonthTodoListsAction(implementationTodoLists, dueTodoLists, message));
        } else {
          const implementationTodoLists: TodoLists = [];
          const dueTodoLists: TodoLists = [];
          dispatch(fetchMonthTodoListsAction(implementationTodoLists, dueTodoLists, message));
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

export const deleteTodoListItem = (todoListItemId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    await axios
      .delete<deleteTodoListItemRes>(`http://127.0.0.1:8082/todo-list/${todoListItemId}`, {
        withCredentials: true,
      })
      .then((res) => {
        const prevImplementationTodoLists = getState().todoLists.implementationTodoLists;
        const prevDueTodoLists = getState().todoLists.dueTodoLists;
        const message = res.data.message;

        const updateTodoLists = (prevTodoLists: TodoLists) => {
          return prevTodoLists.filter((prevTodoList) => {
            return prevTodoList.id !== todoListItemId;
          });
        };

        const updateImplementationTodoLists = updateTodoLists(prevImplementationTodoLists);
        const updateDueTodoLists = updateTodoLists(prevDueTodoLists);

        dispatch(deleteTodoListItemAction(updateImplementationTodoLists, updateDueTodoLists));
        dispatch(openTextModalAction(message));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.data.message);
          dispatch(push('/login'));
        }

        if (error.response.status === 500) {
          alert(error.response.data.error.message);
        }
      });
  };
};
