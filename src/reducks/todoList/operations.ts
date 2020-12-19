import { Action, Dispatch } from 'redux';
import { State } from '../store/types';
import axios, { CancelTokenSource } from 'axios';
import {
  createTodoListItemAction,
  deleteTodoListItemAction,
  editTodoListItemAction,
  fetchDateTodoListAction,
  fetchExpiredTodoListAction,
  fetchMonthTodoListAction,
  searchTodoListAction,
} from './actions';
import {
  createTodoListItemReq,
  createTodoListItemRes,
  deleteTodoListItemRes,
  editTodoListItemReq,
  editTodoListItemRes,
  fetchExpiredTodoListRes,
  fetchMonthTodoListsRes,
  fetchTodayTodoListsRes,
  TodoListItem,
  TodoList,
  fetchSearchTodoListRes,
} from './types';
import moment from 'moment';
import { openTextModalAction } from '../modal/actions';
import {
  dateStringToMonthString,
  dateToDateString,
  dateToYearAndMonthString,
} from '../../lib/date';
import { errorHandling } from '../../lib/validation';

export const createTodoListItem = (
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

    const data: createTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
    };

    try {
      const result = await axios.post<createTodoListItemRes>(
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

      const pushResponseTodoListItem = (
        idx: number,
        prevTodoList: TodoList,
        nextTodoListItem: TodoListItem
      ) => {
        if (idx !== -1) {
          prevTodoList.splice(idx, 0, nextTodoListItem);
        } else if (idx === -1) {
          prevTodoList.push(nextTodoListItem);
        }
        return prevTodoList;
      };

      const expiredTodoList = (prevTodoList: TodoList, responseDate: string) => {
        let nextTodoList: TodoList = [];
        let idx = 0;
        if (dateToDateString(today) > responseDate) {
          idx = prevTodoList.findIndex((listItem) => listItem.due_date >= responseDate);

          nextTodoList = pushResponseTodoListItem(idx, prevTodoList, result.data);
        } else if (dateToDateString(today) <= responseDate) {
          nextTodoList = [...prevTodoList];
        }
        return nextTodoList;
      };

      const todayTodoList = (prevTodoList: TodoList, responseDate: string) => {
        let nextTodoList: TodoList = [];
        if (dateToDateString(today) === responseDate) {
          nextTodoList = [newTodoListItem, ...prevTodoList];
        } else if (dateToDateString(today) !== responseDate) {
          nextTodoList = [...prevTodoList];
        }
        return nextTodoList;
      };

      const monthTodoList = (
        prevTodoList: TodoList,
        responseMonth: string,
        responseDate: string
      ) => {
        let nextTodoList: TodoList = [];
        if (dateToYearAndMonthString(selectedDate) === responseMonth) {
          let idx = 0;
          if (responseDate === result.data.implementation_date) {
            idx = prevTodoList.findIndex(
              (listItem) => listItem.implementation_date >= responseDate
            );
          } else if (responseDate === result.data.due_date) {
            idx = prevTodoList.findIndex((listItem) => listItem.due_date >= responseDate);
          }

          nextTodoList = pushResponseTodoListItem(idx, prevTodoList, result.data);
        } else if (dateToYearAndMonthString(selectedDate) !== responseMonth) {
          nextTodoList = [...prevTodoList];
        }
        return nextTodoList;
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

      const nextMonthImplementationTodoList: TodoList = monthTodoList(
        prevMonthImplementationTodoList,
        responseImplementationMonth,
        result.data.implementation_date
      );
      const nextMonthDueTodoList: TodoList = monthTodoList(
        prevMonthDueTodoList,
        responseDueMonth,
        result.data.due_date
      );

      dispatch(
        createTodoListItemAction(
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
  todoListItemId: number,
  today: Date | null,
  selectedDate: Date | null,
  implementationDate: Date | null,
  dueDate: Date | null,
  todoContent: string,
  completeFlag: boolean
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

      const pushResponseTodoListItem = (
        idx: number,
        prevTodoList: TodoList,
        nextTodoListItem: TodoListItem
      ) => {
        if (idx !== -1) {
          prevTodoList.splice(idx, 0, nextTodoListItem);
        } else if (idx === -1) {
          prevTodoList.push(nextTodoListItem);
        }
        return prevTodoList;
      };

      const updateExpiredTodoList = (prevTodoList: TodoList, responseDate: string) => {
        let nextTodoList: TodoList = [];
        let idx = 0;
        const prevItemIdx = prevTodoList.findIndex(
          (listItem: TodoListItem) => listItem.id === result.data.id
        );

        if (dateToDateString(today) > responseDate) {
          if (result.data.complete_flag === true) {
            prevTodoList.splice(prevItemIdx, 1);
            nextTodoList = [...prevTodoList];
          } else if (result.data.complete_flag === false) {
            if (prevItemIdx !== -1) {
              prevTodoList.splice(prevItemIdx, 1);
            }

            idx = prevTodoList.findIndex((listItem) => {
              return listItem.due_date > responseDate;
            });

            nextTodoList = pushResponseTodoListItem(idx, prevTodoList, result.data);
          }
        } else if (dateToDateString(today) <= responseDate) {
          nextTodoList = [...prevTodoList];
        }
        return nextTodoList;
      };

      const updateTodayTodoList = (prevTodoList: TodoList, responseDate: string) => {
        let nextTodoList: TodoList = [];
        const prevItemIdx = prevTodoList.findIndex(
          (listItem: TodoListItem) => listItem.id === result.data.id
        );

        if (dateToDateString(today) === responseDate) {
          prevTodoList[prevItemIdx] = result.data;
          nextTodoList = [...prevTodoList];
        } else if (dateToDateString(today) !== responseDate) {
          nextTodoList = [...prevTodoList];
        }
        return nextTodoList;
      };

      const updateMonthTodoList = (
        prevTodoList: TodoList,
        responseMonth: string,
        responseDate: string
      ) => {
        let nextTodoList: TodoList = [];
        let idx = 0;
        const prevItemIdx = prevTodoList.findIndex(
          (listItem: TodoListItem) => listItem.id === result.data.id
        );

        if (dateToYearAndMonthString(selectedDate) === responseMonth) {
          const prevCompleteFlag = prevTodoList[prevItemIdx].complete_flag;
          if (prevCompleteFlag !== result.data.complete_flag) {
            prevTodoList[prevItemIdx] = result.data;
            nextTodoList = [...prevTodoList];
          } else if (prevCompleteFlag === result.data.complete_flag) {
            prevTodoList.splice(prevItemIdx, 1);

            idx = prevTodoList.findIndex((listItem) => {
              if (responseDate === listItem.implementation_date) {
                return listItem.implementation_date >= responseDate;
              } else if (responseDate === listItem.due_date) {
                return listItem.due_date >= responseDate;
              }
            });

            nextTodoList = pushResponseTodoListItem(idx, prevTodoList, result.data);
          }
        } else if (dateToYearAndMonthString(selectedDate) !== responseMonth) {
          prevTodoList.splice(prevItemIdx, 1);
          nextTodoList = [...prevTodoList];
        }
        return nextTodoList;
      };

      const searchTodoListItemIdx = prevSearchTodoList.findIndex(
        (item) => item.id === todoListItemId
      );
      prevSearchTodoList[searchTodoListItemIdx] = result.data;
      const nextSearchTodoList: TodoList = [...prevSearchTodoList];

      const nextExpiredTodoList: TodoList =
        prevExpiredTodoList.length === 0
          ? []
          : updateExpiredTodoList(prevExpiredTodoList, result.data.due_date);

      const nextTodayImplementationTodoLists: TodoList = updateTodayTodoList(
        prevTodayImplementationTodoList,
        result.data.implementation_date
      );
      const nextTodayDueTodoLists: TodoList = updateTodayTodoList(
        prevTodayDueTodoList,
        result.data.due_date
      );

      const nextMonthImplementationTodoList: TodoList =
        prevMonthImplementationTodoList.length === 0
          ? []
          : updateMonthTodoList(
              prevMonthImplementationTodoList,
              responseImplementationMonth,
              result.data.implementation_date
            );

      const nextMonthDueTodoLists: TodoList =
        prevMonthDueTodoList.length === 0
          ? []
          : updateMonthTodoList(prevMonthDueTodoList, responseDueMonth, result.data.due_date);

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

export const searchTodoList = (searchRequestData: {
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
      const result = await axios.get<fetchSearchTodoListRes>(
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
        dispatch(searchTodoListAction(searchTodoList, message));
      } else if (message === undefined) {
        const message = '';
        dispatch(searchTodoListAction(searchTodoList, message));
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
