import { Action, Dispatch } from 'redux';
import { State } from '../store/types';
import axios from 'axios';
import {
  createTodoListItemAction,
  deleteTodoListItemAction,
  editTodoListItemAction,
  fetchDateTodoListsAction,
  fetchMonthTodoListAction,
} from './actions';
import {
  createTodoListItemReq,
  createTodoListItemRes,
  deleteTodoListItemRes,
  editTodoListItemReq,
  editTodoListItemRes,
  fetchMonthTodoListsRes,
  fetchTodayTodoListsRes,
  TodoListItem,
  TodoLists,
} from './types';
import moment from 'moment';
import { openTextModalAction } from '../modal/actions';
import { dateToDateString } from '../../lib/date';
import { errorHandling } from '../../lib/validation';

export const createTodoListItem = (
  implementationDate: Date | null,
  dueDate: Date | null,
  todoContent: string,
  isTodayTodo: boolean
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
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list`,
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

        let newImplementationTodoLists: TodoLists = [];
        let newDueTodoLists: TodoLists = [];

        if (isTodayTodo) {
          const today = new Date();
          if (dateToDateString(today) === res.data.implementation_date) {
            newImplementationTodoLists = [todoListItem, ...prevImplementationTodoLists];
          } else {
            newImplementationTodoLists = [...prevImplementationTodoLists];
          }
          if (dateToDateString(today) === res.data.due_date) {
            newDueTodoLists = [todoListItem, ...prevDueTodoLists];
          } else {
            newDueTodoLists = [...prevDueTodoLists];
          }
        } else {
          newImplementationTodoLists = [todoListItem, ...prevImplementationTodoLists];
          newDueTodoLists = [todoListItem, ...prevDueTodoLists];
        }

        dispatch(createTodoListItemAction(newImplementationTodoLists, newDueTodoLists));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
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

    const data: editTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: completeFlag,
    };

    await axios
      .put<editTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`,
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
        errorHandling(dispatch, error);
      });
  };
};

export const fetchDateTodoLists = (year: string, month: string, date: string) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get<fetchTodayTodoListsRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}-${date}`,
        {
          withCredentials: true,
        }
      )
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
        errorHandling(dispatch, error);
      });
  };
};

export const fetchMonthTodoList = (year: string, month: string) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get<fetchMonthTodoListsRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const monthImplementationTodoLists = res.data.implementation_todo_list;
        const monthDueTodoLists = res.data.due_todo_list;
        const message = res.data.message;

        if (monthImplementationTodoLists !== undefined && monthDueTodoLists !== undefined) {
          const message = '';
          dispatch(
            fetchMonthTodoListAction(monthImplementationTodoLists, monthDueTodoLists, message)
          );
        } else {
          const monthImplementationTodoLists: TodoLists = [];
          const monthDueTodoLists: TodoLists = [];
          dispatch(
            fetchMonthTodoListAction(monthImplementationTodoLists, monthDueTodoLists, message)
          );
        }
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const deleteTodoListItem = (todoListItemId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    await axios
      .delete<deleteTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`,
        {
          withCredentials: true,
        }
      )
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
        errorHandling(dispatch, error);
      });
  };
};
