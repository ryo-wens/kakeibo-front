import { Action, Dispatch } from 'redux';
import { State } from '../store/types';
import axios from 'axios';
import {
  createTodoListItemAction,
  deleteTodoListItemAction,
  editTodoListItemAction,
  fetchDateTodoListAction,
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
  TodoList,
} from './types';
import moment from 'moment';
import { openTextModalAction } from '../modal/actions';
import { dateStringToMonthString, dateToDateString, dateToMonthString } from '../../lib/date';
import { errorHandling } from '../../lib/validation';

export const createTodoListItem = (
  today: Date,
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
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list`,
        JSON.stringify(data, function (key, value) {
          if (key === 'implementation_date') {
            return moment(new Date(value)).format();
          } else if (key === 'due_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const prevTodayImplementationTodoList: TodoList = getState().todoList
          .todayImplementationTodoList;
        const prevTodayDueTodoList: TodoList = getState().todoList.todayDueTodoList;
        const prevMonthImplementationTodoList: TodoList = getState().todoList
          .monthImplementationTodoList;
        const prevMonthDueTodoList: TodoList = getState().todoList.monthDueTodoList;

        const newTodoListItem: TodoListItem = res.data;

        const todayTodoList = (prevTodoList: TodoList, responseDate: string) => {
          let nextTodoList: TodoList = [];
          if (dateToDateString(today) === responseDate) {
            nextTodoList = [newTodoListItem, ...prevTodoList];
          } else if (dateToDateString(today) !== responseDate) {
            return prevTodoList;
          }
          return nextTodoList;
        };

        const responseImplementationMonth = dateStringToMonthString(res.data.implementation_date);
        const responseDueMonth = dateStringToMonthString(res.data.due_date);

        const monthTodoList = (
          prevTodoList: TodoList,
          responseMonth: string,
          responseDate: string
        ) => {
          let nextTodoList: TodoList = [];
          if (dateToMonthString(today) === responseMonth) {
            let idx = 0;
            if (responseDate === res.data.implementation_date) {
              idx = prevTodoList.findIndex(
                (listItem) => listItem.implementation_date >= responseDate
              );
            } else if (responseDate === res.data.due_date) {
              idx = prevTodoList.findIndex((listItem) => listItem.due_date >= responseDate);
            }
            prevTodoList.splice(idx, 0, newTodoListItem);
            nextTodoList = [...prevTodoList];
          } else if (dateToMonthString(today) !== responseMonth) {
            nextTodoList = [...prevTodoList];
          }
          return nextTodoList;
        };

        const nextTodayImplementationTodoList: TodoList = todayTodoList(
          prevTodayImplementationTodoList,
          res.data.implementation_date
        );
        const nextTodayDueTodoList: TodoList = todayTodoList(
          prevTodayDueTodoList,
          res.data.due_date
        );

        const nextMonthImplementationTodoList: TodoList = monthTodoList(
          prevMonthImplementationTodoList,
          responseImplementationMonth,
          res.data.implementation_date
        );
        const nextMonthDueTodoList: TodoList = monthTodoList(
          prevMonthDueTodoList,
          responseDueMonth,
          res.data.due_date
        );

        dispatch(
          createTodoListItemAction(
            nextTodayImplementationTodoList,
            nextTodayDueTodoList,
            nextMonthImplementationTodoList,
            nextMonthDueTodoList
          )
        );
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const editTodoListItem = (
  todoListItemId: number,
  today: Date,
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
            return moment(new Date(value)).format();
          } else if (key === 'due_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const prevTodayImplementationTodoList: TodoList = getState().todoList
          .todayImplementationTodoList;
        const prevTodayDueTodoList: TodoList = getState().todoList.todayDueTodoList;
        const prevMonthImplementationTodoList: TodoList = getState().todoList
          .monthImplementationTodoList;
        const prevMonthDueTodoList: TodoList = getState().todoList.monthDueTodoList;

        const responseImplementationMonth = dateStringToMonthString(res.data.implementation_date);
        const responseDueMonth = dateStringToMonthString(res.data.due_date);
        const thisMonth = dateToMonthString(today);

        const updateTodayTodoList = (
          prevTodoList: TodoList,
          responseDate: string,
          today: string
        ) => {
          const updateList: TodoList = [];
          if (responseDate === today) {
            for (const prevTodoListItem of prevTodoList) {
              if (res.data.id !== prevTodoListItem.id) {
                updateList.push(prevTodoListItem);
              } else {
                const updateTodoListItem = res.data;
                updateList.push(updateTodoListItem);
              }
            }
          } else if (responseDate !== today) {
            for (const prevTodoListItem of prevTodoList) {
              if (res.data.id !== prevTodoListItem.id) {
                updateList.push(prevTodoListItem);
              }
            }
          }
          updateList.sort((a, b) => {
            const prevUpdateDate = a.updated_date as Date;
            const nextUpdateDate = b.updated_date as Date;
            if (new Date(prevUpdateDate).getTime() > new Date(nextUpdateDate).getTime()) {
              return -1;
            } else {
              return 1;
            }
          });
          return updateList;
        };

        const updateTodayImplementationTodoLists: TodoList = updateTodayTodoList(
          prevTodayImplementationTodoList,
          res.data.implementation_date,
          dateToDateString(today)
        );
        const updateTodayDueTodoLists: TodoList = updateTodayTodoList(
          prevTodayDueTodoList,
          res.data.due_date,
          dateToDateString(today)
        );
        const updateMonthImplementationTodoList: TodoList = updateTodayTodoList(
          prevMonthImplementationTodoList,
          responseImplementationMonth,
          thisMonth
        );
        const updateMonthDueTodoLists: TodoList = updateTodayTodoList(
          prevMonthDueTodoList,
          responseDueMonth,
          thisMonth
        );

        dispatch(
          editTodoListItemAction(
            updateTodayImplementationTodoLists,
            updateTodayDueTodoLists,
            updateMonthImplementationTodoList,
            updateMonthDueTodoLists
          )
        );
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
        const implementationTodoList = res.data.implementation_todo_list;
        const dueTodoList = res.data.due_todo_list;
        const message = res.data.message;

        if (implementationTodoList !== undefined && dueTodoList !== undefined) {
          const message = '';
          dispatch(fetchDateTodoListAction(implementationTodoList, dueTodoList, message));
        } else {
          const implementationTodoList: TodoList = [];
          const dueTodoList: TodoList = [];
          dispatch(fetchDateTodoListAction(implementationTodoList, dueTodoList, message));
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
          const monthImplementationTodoLists: TodoList = [];
          const monthDueTodoLists: TodoList = [];
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
        const prevTodayImplementationTodoList = getState().todoList.todayImplementationTodoList;
        const prevTodayDueTodoList = getState().todoList.todayDueTodoList;
        const prevMonthImplementationTodoList: TodoList = getState().todoList
          .monthImplementationTodoList;
        const prevMonthDueTodoList: TodoList = getState().todoList.monthDueTodoList;
        const message = res.data.message;

        const updateTodoLists = (prevTodoLists: TodoList) => {
          return prevTodoLists.filter((prevTodoList) => {
            return prevTodoList.id !== todoListItemId;
          });
        };

        const updateTodayImplementationTodoLists = updateTodoLists(prevTodayImplementationTodoList);
        const updateTodayDueTodoLists = updateTodoLists(prevTodayDueTodoList);
        const updateMonthImplementationTodoLists = updateTodoLists(prevMonthImplementationTodoList);
        const updateMonthDueTodoLists = updateTodoLists(prevMonthDueTodoList);

        dispatch(
          deleteTodoListItemAction(
            updateTodayImplementationTodoLists,
            updateTodayDueTodoLists,
            updateMonthImplementationTodoLists,
            updateMonthDueTodoLists
          )
        );
        dispatch(openTextModalAction(message));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};
