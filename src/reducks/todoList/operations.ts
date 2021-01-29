import { Action, Dispatch } from 'redux';
import { State } from '../store/types';
import axios, { CancelTokenSource } from 'axios';
import {
  addTodoListItemAction,
  deleteTodoListItemAction,
  editTodoListItemAction,
  fetchDateTodoListAction,
  fetchExpiredTodoListAction,
  fetchMonthTodoListAction,
  fetchSearchTodoListAction,
} from './actions';
import {
  AddTodoListItemReq,
  AddTodoListItemRes,
  deleteTodoListItemRes,
  editTodoListItemReq,
  editTodoListItemRes,
  fetchExpiredTodoListRes,
  fetchMonthTodoListsRes,
  FetchSearchTodoListRes,
  fetchTodayTodoListsRes,
  TodoList,
  TodoListItem,
} from './types';
import moment from 'moment';
import { openTextModalAction } from '../modal/actions';
import {
  dateStringToMonthString,
  dateToDateString,
  dateToYearAndMonthString,
} from '../../lib/date';
import { errorHandling } from '../../lib/validation';

export const addTodoListItem = (
  today: Date | null,
  selectedDate: Date | null,
  implementationDate: Date | null,
  dueDate: Date | null,
  todoContent: string
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (today === null) {
      return;
    }
    if (selectedDate === null) {
      return;
    }
    if (implementationDate === null) {
      return;
    }
    if (dueDate === null) {
      return;
    }
    if (todoContent === '') {
      return;
    }

    const data: AddTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
    };

    try {
      const result = await axios.post<AddTodoListItemRes>(
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
      );

      const prevExpiredTodoList: TodoList = getState().todoList.expiredTodoList;
      const prevTodayImplementationTodoList: TodoList = getState().todoList
        .todayImplementationTodoList;
      const prevTodayDueTodoList: TodoList = getState().todoList.todayDueTodoList;
      const prevMonthImplementationTodoList: TodoList = getState().todoList
        .monthImplementationTodoList;
      const prevMonthDueTodoList: TodoList = getState().todoList.monthDueTodoList;

      const newTodoListItem: TodoListItem = result.data;
      const responseImplementationMonth = dateStringToMonthString(result.data.implementation_date);
      const responseDueMonth = dateStringToMonthString(result.data.due_date);
      const NOT_FOUND = -1;

      const pushResponseTodoListItem = (
        idx: number,
        prevTodoList: TodoList,
        nextTodoListItem: TodoListItem
      ) => {
        if (idx === NOT_FOUND) {
          return prevTodoList.concat(nextTodoListItem);
        }
        prevTodoList.splice(idx, 0, nextTodoListItem);
        return prevTodoList.concat();
      };

      const expiredTodoList = (prevTodoList: TodoList, responseDate: string) => {
        if (dateToDateString(today) > responseDate) {
          const idx = prevTodoList.findIndex((listItem) => listItem.due_date > responseDate);
          return pushResponseTodoListItem(idx, prevTodoList, result.data);
        }
        return prevTodoList;
      };

      const todayTodoList = (prevTodoList: TodoList, responseDate: string) => {
        if (dateToDateString(today) === responseDate) {
          return prevTodoList.concat(newTodoListItem);
        }
        return prevTodoList;
      };

      const monthlyTodoList = (
        prevTodoList: TodoList,
        responseMonth: string,
        responseDate: string
      ) => {
        if (dateToYearAndMonthString(selectedDate) === responseMonth) {
          const idx = prevTodoList.findIndex((listItem) => {
            if (responseDate === result.data.implementation_date) {
              return listItem.implementation_date > responseDate;
            } else if (responseDate === result.data.due_date) {
              return listItem.due_date > responseDate;
            }
          });

          return pushResponseTodoListItem(idx, prevTodoList, result.data);
        }
        return prevTodoList;
      };

      const nextExpiredTodoList: TodoList = expiredTodoList(
        prevExpiredTodoList,
        result.data.due_date
      );

      const nextTodayImplementationTodoList: TodoList = todayTodoList(
        prevTodayImplementationTodoList,
        result.data.implementation_date
      );
      const nextTodayDueTodoList: TodoList = todayTodoList(
        prevTodayDueTodoList,
        result.data.due_date
      );

      const nextMonthImplementationTodoList: TodoList = monthlyTodoList(
        prevMonthImplementationTodoList,
        responseImplementationMonth,
        result.data.implementation_date
      );
      const nextMonthDueTodoList: TodoList = monthlyTodoList(
        prevMonthDueTodoList,
        responseDueMonth,
        result.data.due_date
      );

      dispatch(
        addTodoListItemAction(
          nextExpiredTodoList,
          nextTodayImplementationTodoList,
          nextTodayDueTodoList,
          nextMonthImplementationTodoList,
          nextMonthDueTodoList
        )
      );
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const editTodoListItem = (
  today: Date | null,
  currentYearMonth: string,
  todoListItemId: number,
  implementationDate: Date | null,
  dueDate: Date | null,
  todoContent: string,
  completeFlag: boolean
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (today === null) {
      return;
    }
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

    try {
      const result = await axios.put<editTodoListItemRes>(
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
      );

      const prevExpiredTodoList: TodoList = getState().todoList.expiredTodoList;
      const prevTodayImplementationTodoList: TodoList = getState().todoList
        .todayImplementationTodoList;
      const prevTodayDueTodoList: TodoList = getState().todoList.todayDueTodoList;
      const prevMonthImplementationTodoList: TodoList = getState().todoList
        .monthImplementationTodoList;
      const prevMonthDueTodoList: TodoList = getState().todoList.monthDueTodoList;
      const prevSearchTodoList: TodoList = getState().todoList.searchTodoList;

      const responseImplementationMonth = dateStringToMonthString(result.data.implementation_date);
      const responseDueMonth = dateStringToMonthString(result.data.due_date);
      const nextTodoListItem: TodoListItem = result.data;
      const NOT_FOUND = -1;

      const pushResponseTodoListItem = (
        idx: number,
        prevTodoList: TodoList,
        nextTodoListItem: TodoListItem
      ) => {
        if (idx === NOT_FOUND) {
          return prevTodoList.concat(nextTodoListItem);
        }
        prevTodoList.splice(idx, 0, nextTodoListItem);
        return prevTodoList.concat();
      };

      const updateExpiredTodoList = (prevTodoList: TodoList, resTodoListItem: TodoListItem) => {
        const prevItemIdx = prevTodoList.findIndex(
          (listItem: TodoListItem) => listItem.id === resTodoListItem.id
        );

        if (dateToDateString(today) > resTodoListItem.due_date && !resTodoListItem.complete_flag) {
          if (prevItemIdx !== NOT_FOUND) {
            prevTodoList.splice(prevItemIdx, 1);
          }

          const idx = prevTodoList.findIndex((listItem) => {
            if (listItem.due_date === resTodoListItem.due_date) {
              return listItem.id > resTodoListItem.id;
            }
            return listItem.due_date > resTodoListItem.due_date;
          });

          return pushResponseTodoListItem(idx, prevTodoList, resTodoListItem);
        }

        if (prevItemIdx === NOT_FOUND) {
          return prevTodoList;
        }

        prevTodoList.splice(prevItemIdx, 1);
        return prevTodoList.concat();
      };

      const updateTodayTodoList = (prevTodoList: TodoList, responseDate: string) => {
        const prevItemIdx = prevTodoList.findIndex(
          (listItem: TodoListItem) => listItem.id === nextTodoListItem.id
        );

        if (dateToDateString(today) === responseDate) {
          if (prevItemIdx === NOT_FOUND) {
            const idx = prevTodoList.findIndex((listItem) => listItem.id > nextTodoListItem.id);
            return pushResponseTodoListItem(idx, prevTodoList, nextTodoListItem);
          }

          prevTodoList[prevItemIdx] = nextTodoListItem;
          return prevTodoList.concat();
        }
        if (prevItemIdx === NOT_FOUND) {
          return prevTodoList;
        }

        prevTodoList.splice(prevItemIdx, 1);
        return prevTodoList.concat();
      };

      const updateMonthlyTodoList = (prevTodoList: TodoList, responseMonth: string) => {
        const prevItemIdx = prevTodoList.findIndex(
          (listItem: TodoListItem) => listItem.id === nextTodoListItem.id
        );

        if (currentYearMonth === responseMonth) {
          if (prevItemIdx !== NOT_FOUND) {
            prevTodoList.splice(prevItemIdx, 1);
          }

          const idx = prevTodoList.findIndex((listItem) => {
            if (prevTodoList === prevMonthImplementationTodoList) {
              if (listItem.implementation_date === nextTodoListItem.implementation_date) {
                return listItem.id > nextTodoListItem.id;
              }
              return listItem.implementation_date > nextTodoListItem.implementation_date;
            }
            if (prevTodoList === prevMonthDueTodoList) {
              if (listItem.due_date === nextTodoListItem.due_date) {
                return listItem.id > nextTodoListItem.id;
              }
              return listItem.due_date > nextTodoListItem.due_date;
            }
          });

          return pushResponseTodoListItem(idx, prevTodoList, nextTodoListItem);
        }

        if (prevItemIdx === NOT_FOUND) {
          return prevTodoList;
        }
        prevTodoList.splice(prevItemIdx, 1);
        return prevTodoList.concat();
      };

      const searchTodoListItemIdx = prevSearchTodoList.findIndex(
        (item) => item.id === todoListItemId
      );
      prevSearchTodoList[searchTodoListItemIdx] = nextTodoListItem;
      const nextSearchTodoList: TodoList = [...prevSearchTodoList];

      const nextExpiredTodoList = updateExpiredTodoList(prevExpiredTodoList, nextTodoListItem);

      const nextTodayImplementationTodoLists: TodoList = updateTodayTodoList(
        prevTodayImplementationTodoList,
        nextTodoListItem.implementation_date
      );
      const nextTodayDueTodoLists: TodoList = updateTodayTodoList(
        prevTodayDueTodoList,
        nextTodoListItem.due_date
      );

      const nextMonthImplementationTodoList: TodoList = updateMonthlyTodoList(
        prevMonthImplementationTodoList,
        responseImplementationMonth
      );

      const nextMonthDueTodoLists: TodoList = updateMonthlyTodoList(
        prevMonthDueTodoList,
        responseDueMonth
      );

      dispatch(
        editTodoListItemAction(
          nextExpiredTodoList,
          nextTodayImplementationTodoLists,
          nextTodayDueTodoLists,
          nextMonthImplementationTodoList,
          nextMonthDueTodoLists,
          nextSearchTodoList
        )
      );
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const fetchDateTodoList = (
  year: string,
  month: string,
  date: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<fetchTodayTodoListsRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}-${date}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const implementationTodoList = result.data.implementation_todo_list;
      const dueTodoList = result.data.due_todo_list;
      const message = result.data.message;

      if (implementationTodoList !== undefined && dueTodoList !== undefined) {
        const message = '';
        dispatch(fetchDateTodoListAction(implementationTodoList, dueTodoList, message));
      } else {
        const implementationTodoList: TodoList = [];
        const dueTodoList: TodoList = [];
        dispatch(fetchDateTodoListAction(implementationTodoList, dueTodoList, message));
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        errorHandling(dispatch, error);
      }
    }
  };
};

export const fetchMonthTodoList = (year: string, month: string, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<fetchMonthTodoListsRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const monthImplementationTodoLists = result.data.implementation_todo_list;
      const monthDueTodoLists = result.data.due_todo_list;
      const message = result.data.message;

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
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        errorHandling(dispatch, error);
      }
    }
  };
};

export const fetchExpiredTodoList = (signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<fetchExpiredTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const expiredTodoList: TodoList = result.data.expired_todo_list;

      dispatch(fetchExpiredTodoListAction(expiredTodoList));
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        errorHandling(dispatch, error);
      }
    }
  };
};

export const deleteTodoListItem = (todoListItemId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    try {
      const result = await axios.delete<deleteTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`,
        {
          withCredentials: true,
        }
      );
      const prevExpiredTodoList: TodoList = getState().todoList.expiredTodoList;
      const prevTodayImplementationTodoList: TodoList = getState().todoList
        .todayImplementationTodoList;
      const prevTodayDueTodoList: TodoList = getState().todoList.todayDueTodoList;
      const prevMonthImplementationTodoList: TodoList = getState().todoList
        .monthImplementationTodoList;
      const prevMonthDueTodoList: TodoList = getState().todoList.monthDueTodoList;
      const prevSearchTodoList: TodoList = getState().todoList.searchTodoList;
      const message = result.data.message;

      const nextTodoList = (prevTodoList: TodoList) => {
        return prevTodoList.filter((prevTodoListItem) => {
          return prevTodoListItem.id !== todoListItemId;
        });
      };

      const nextExpiredTodoList = nextTodoList(prevExpiredTodoList);
      const nextTodayImplementationTodoList = nextTodoList(prevTodayImplementationTodoList);
      const nextTodayDueTodoList = nextTodoList(prevTodayDueTodoList);
      const nextMonthImplementationTodoList = nextTodoList(prevMonthImplementationTodoList);
      const nextMonthDueTodoList = nextTodoList(prevMonthDueTodoList);
      const nextSearchTodoList = nextTodoList(prevSearchTodoList);

      dispatch(
        deleteTodoListItemAction(
          nextExpiredTodoList,
          nextTodayImplementationTodoList,
          nextTodayDueTodoList,
          nextMonthImplementationTodoList,
          nextMonthDueTodoList,
          nextSearchTodoList
        )
      );
      dispatch(openTextModalAction(message));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const fetchSearchTodoList = (searchRequestData: {
  date_type: string;
  start_date: Date | null;
  end_date: Date | null;
  sort: string;
  sort_type: string;
  complete_flag?: boolean | string;
  todo_content?: string;
  limit?: string;
}) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<FetchSearchTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/search`,
        {
          withCredentials: true,
          params: {
            date_type: searchRequestData.date_type,
            start_date: moment(searchRequestData.start_date).format(),
            end_date: moment(searchRequestData.end_date).format(),
            complete_flag: searchRequestData.complete_flag,
            todo_content: searchRequestData.todo_content,
            sort: searchRequestData.sort,
            sort_type: searchRequestData.sort_type,
            limit: searchRequestData.limit,
          },
        }
      );
      const searchTodoList: TodoList = result.data.search_todo_list;
      const message: string = result.data.message;

      if (searchTodoList === undefined) {
        const searchTodoList: TodoList = [];
        dispatch(fetchSearchTodoListAction(searchTodoList, message));
      } else if (message === undefined) {
        const message = '';
        dispatch(fetchSearchTodoListAction(searchTodoList, message));
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
