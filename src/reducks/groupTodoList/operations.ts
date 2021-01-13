import axios, { CancelTokenSource } from 'axios';
import { Action, Dispatch } from 'redux';
import { State } from '../store/types';
import moment from 'moment';
import {
  createGroupTodoListItemReq,
  createGroupTodoListItemRes,
  deleteGroupTodoListItemRes,
  editGroupTodoListItemReq,
  editGroupTodoListItemRes,
  fetchGroupDateTodoListRes,
  fetchGroupExpiredTodoListRes,
  fetchGroupMonthTodoListRes,
  GroupTodoListItem,
  GroupTodoList,
  fetchSearchGroupTodoListRes,
} from './types';
import {
  addGroupTodoListItemAction,
  deleteGroupTodoListItemAction,
  editGroupTodoListItemAction,
  fetchGroupTodayTodoListAction,
  fetchGroupMonthTodoListAction,
  fetchGroupExpiredTodoListAction,
  groupSearchTodoListAction,
} from './actions';
import { openTextModalAction } from '../modal/actions';
import { errorHandling } from '../../lib/validation';
import {
  dateStringToMonthString,
  dateToDateString,
  dateToYearAndMonthString,
} from '../../lib/date';

export const addGroupTodoListItem = (
  groupId: number,
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

    const data: createGroupTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
    };
    try {
      const result = await axios.post<createGroupTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list`,
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
      const prevGroupExpiredTodoList: GroupTodoList = getState().groupTodoList.groupExpiredTodoList;
      const prevGroupTodayImplementationTodoList: GroupTodoList = getState().groupTodoList
        .groupTodayImplementationTodoList;
      const prevGroupTodayDueTodoList: GroupTodoList = getState().groupTodoList
        .groupTodayDueTodoList;
      const prevGroupMonthImplementationTodoList: GroupTodoList = getState().groupTodoList
        .groupMonthImplementationTodoList;
      const prevGroupMonthDueTodoList: GroupTodoList = getState().groupTodoList
        .groupMonthDueTodoList;

      const newTodoListItem: GroupTodoListItem = result.data;
      const responseImplementationMonth = dateStringToMonthString(
        newTodoListItem.implementation_date
      );
      const responseDueMonth = dateStringToMonthString(newTodoListItem.due_date);
      const NOT_FOUND = -1;

      const pushResponseTodoListItem = (
        idx: number,
        prevTodoList: GroupTodoList,
        nextTodoListItem: GroupTodoListItem
      ) => {
        if (idx === NOT_FOUND) {
          return prevTodoList.concat(nextTodoListItem);
        }
        prevTodoList.splice(idx, 0, nextTodoListItem);
        return prevTodoList.concat();
      };

      const groupExpiredTodoList = (prevTodoList: GroupTodoList, responseDate: string) => {
        if (dateToDateString(today) > responseDate) {
          const idx = prevTodoList.findIndex((listItem) => listItem.due_date > responseDate);
          return pushResponseTodoListItem(idx, prevTodoList, newTodoListItem);
        }
        return prevTodoList;
      };

      const groupTodayTodoList = (prevTodoList: GroupTodoList, responseDate: string) => {
        if (dateToDateString(today) === responseDate) {
          return prevTodoList.concat(newTodoListItem);
        }
        return prevTodoList;
      };

      const groupMonthTodoList = (
        prevTodoList: GroupTodoList,
        responseMonth: string,
        responseDate: string
      ) => {
        if (dateToYearAndMonthString(selectedDate) === responseMonth) {
          const idx = prevTodoList.findIndex((listItem) => {
            if (prevTodoList === prevGroupTodayImplementationTodoList) {
              return listItem.implementation_date > responseDate;
            } else if (prevTodoList === prevGroupTodayDueTodoList) {
              return listItem.due_date > responseDate;
            }
          });

          return pushResponseTodoListItem(idx, prevTodoList, newTodoListItem);
        }
        return prevTodoList;
      };

      const nextGroupExpiredTodoList: GroupTodoList = groupExpiredTodoList(
        prevGroupExpiredTodoList,
        newTodoListItem.due_date
      );

      const nextGroupTodayImplementationTodoList: GroupTodoList = groupTodayTodoList(
        prevGroupTodayImplementationTodoList,
        newTodoListItem.implementation_date
      );
      const nextGroupTodayDueTodoList: GroupTodoList = groupTodayTodoList(
        prevGroupTodayDueTodoList,
        newTodoListItem.due_date
      );

      const nextGroupMonthImplementationTodoList: GroupTodoList = groupMonthTodoList(
        prevGroupMonthImplementationTodoList,
        responseImplementationMonth,
        newTodoListItem.implementation_date
      );
      const nextGroupMonthDueTodoList: GroupTodoList = groupMonthTodoList(
        prevGroupMonthDueTodoList,
        responseDueMonth,
        newTodoListItem.due_date
      );

      dispatch(
        addGroupTodoListItemAction(
          nextGroupExpiredTodoList,
          nextGroupTodayImplementationTodoList,
          nextGroupTodayDueTodoList,
          nextGroupMonthImplementationTodoList,
          nextGroupMonthDueTodoList
        )
      );
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const editGroupTodoListItem = (
  today: Date | null,
  currentYearMonth: string,
  groupId: number,
  todoListItemId: number,
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

    const data: editGroupTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: completeFlag,
    };

    try {
      const result = await axios.put<editGroupTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`,
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
      const prevGroupExpiredTodoList: GroupTodoList = getState().groupTodoList.groupExpiredTodoList;
      const prevGroupTodayImplementationTodoList: GroupTodoList = getState().groupTodoList
        .groupTodayImplementationTodoList;
      const prevGroupTodayDueTodoList: GroupTodoList = getState().groupTodoList
        .groupTodayDueTodoList;
      const prevGroupMonthImplementationTodoList: GroupTodoList = getState().groupTodoList
        .groupMonthImplementationTodoList;
      const prevGroupMonthDueTodoList: GroupTodoList = getState().groupTodoList
        .groupMonthDueTodoList;
      const prevGroupSearchTodoList: GroupTodoList = getState().groupTodoList.groupSearchTodoList;

      const nextTodoListItem: GroupTodoListItem = result.data;
      const responseImplementationMonth = dateStringToMonthString(
        nextTodoListItem.implementation_date
      );
      const responseDueMonth = dateStringToMonthString(nextTodoListItem.due_date);
      const NOT_FOUND = -1;

      const pushResponseTodoListItem = (
        idx: number,
        prevTodoList: GroupTodoList,
        nextTodoListItem: GroupTodoListItem
      ) => {
        if (idx === NOT_FOUND) {
          return prevTodoList.concat(nextTodoListItem);
        }
        prevTodoList.splice(idx, 0, nextTodoListItem);
        return prevTodoList.concat();
      };

      const updateGroupExpiredTodoList = (
        prevTodoList: GroupTodoList,
        resTodoListItem: GroupTodoListItem
      ) => {
        const prevItemIdx = prevTodoList.findIndex(
          (listItem: GroupTodoListItem) => listItem.id === resTodoListItem.id
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

      const updateGroupTodayTodoList = (prevTodoList: GroupTodoList, responseDate: string) => {
        const prevItemIdx = prevTodoList.findIndex(
          (listItem: GroupTodoListItem) => listItem.id === nextTodoListItem.id
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

      const updateGroupMonthlyTodoList = (prevTodoList: GroupTodoList, responseMonth: string) => {
        const prevItemIdx = prevTodoList.findIndex(
          (listItem: GroupTodoListItem) => listItem.id === nextTodoListItem.id
        );

        if (currentYearMonth === responseMonth) {
          if (prevItemIdx !== NOT_FOUND) {
            prevTodoList.splice(prevItemIdx, 1);
          }

          const idx = prevTodoList.findIndex((listItem) => {
            if (prevTodoList === prevGroupMonthImplementationTodoList) {
              if (listItem.implementation_date === nextTodoListItem.implementation_date) {
                return listItem.id > nextTodoListItem.id;
              }
              return listItem.implementation_date > nextTodoListItem.implementation_date;
            }
            if (prevTodoList === prevGroupMonthDueTodoList) {
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

      const searchTodoListItemIdx = prevGroupSearchTodoList.findIndex(
        (item) => item.id === todoListItemId
      );
      prevGroupSearchTodoList[searchTodoListItemIdx] = result.data;
      const nextGroupSearchTodoList: GroupTodoList = [...prevGroupSearchTodoList];

      const nextGroupExpiredTodoList: GroupTodoList = updateGroupExpiredTodoList(
        prevGroupExpiredTodoList,
        nextTodoListItem
      );

      const nextGroupTodayImplementationTodoList: GroupTodoList = updateGroupTodayTodoList(
        prevGroupTodayImplementationTodoList,
        nextTodoListItem.implementation_date
      );
      const nextGroupTodayDueTodoList: GroupTodoList = updateGroupTodayTodoList(
        prevGroupTodayDueTodoList,
        nextTodoListItem.due_date
      );
      const nextGroupMonthImplementationTodoList: GroupTodoList = updateGroupMonthlyTodoList(
        prevGroupMonthImplementationTodoList,
        responseImplementationMonth
      );

      const nextGroupMonthDueTodoList: GroupTodoList = updateGroupMonthlyTodoList(
        prevGroupMonthDueTodoList,
        responseDueMonth
      );

      dispatch(
        editGroupTodoListItemAction(
          nextGroupExpiredTodoList,
          nextGroupTodayImplementationTodoList,
          nextGroupTodayDueTodoList,
          nextGroupMonthImplementationTodoList,
          nextGroupMonthDueTodoList,
          nextGroupSearchTodoList
        )
      );
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const fetchGroupTodayTodoList = (
  groupId: number,
  year: string,
  month: string,
  date: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<fetchGroupDateTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}-${date}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const groupTodayImplementationTodoList = result.data.implementation_todo_list;
      const groupTodayDueTodoList = result.data.due_todo_list;
      const message = result.data.message;

      if (groupTodayImplementationTodoList !== undefined && groupTodayDueTodoList !== undefined) {
        const message = '';
        dispatch(
          fetchGroupTodayTodoListAction(
            groupTodayImplementationTodoList,
            groupTodayDueTodoList,
            message
          )
        );
      } else {
        const groupTodayImplementationTodoList: GroupTodoList = [];
        const groupTodayDueTodoList: GroupTodoList = [];
        dispatch(
          fetchGroupTodayTodoListAction(
            groupTodayImplementationTodoList,
            groupTodayDueTodoList,
            message
          )
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

export const fetchGroupMonthTodoList = (
  groupId: number,
  year: string,
  month: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<fetchGroupMonthTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const groupMonthImplementationTodoList = result.data.implementation_todo_list;
      const groupMonthDueTodoList = result.data.due_todo_list;
      const message = result.data.message;

      if (groupMonthImplementationTodoList !== undefined && groupMonthDueTodoList !== undefined) {
        const message = '';
        dispatch(
          fetchGroupMonthTodoListAction(
            groupMonthImplementationTodoList,
            groupMonthDueTodoList,
            message
          )
        );
      } else {
        const groupMonthImplementationTodoList: GroupTodoList = [];
        const groupMonthDueTodoList: GroupTodoList = [];
        dispatch(
          fetchGroupMonthTodoListAction(
            groupMonthImplementationTodoList,
            groupMonthDueTodoList,
            message
          )
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

export const fetchGroupExpiredTodoList = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<fetchGroupExpiredTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const groupExpiredTodoList: GroupTodoList = result.data.expired_group_todo_list;

      dispatch(fetchGroupExpiredTodoListAction(groupExpiredTodoList));
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        errorHandling(dispatch, error);
      }
    }
  };
};

export const deleteGroupTodoListItem = (groupId: number, todoListItemId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    try {
      const result = await axios.delete<deleteGroupTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`,
        {
          withCredentials: true,
        }
      );
      const prevGroupExpiredTodoList: GroupTodoList = getState().groupTodoList.groupExpiredTodoList;
      const prevGroupTodayImplementationTodoList: GroupTodoList = getState().groupTodoList
        .groupTodayImplementationTodoList;
      const prevGroupTodayDueTodoList: GroupTodoList = getState().groupTodoList
        .groupTodayDueTodoList;
      const prevGroupMonthImplementationTodoList: GroupTodoList = getState().groupTodoList
        .groupMonthImplementationTodoList;
      const prevGroupMonthDueTodoList: GroupTodoList = getState().groupTodoList
        .groupMonthDueTodoList;
      const prevGroupSearchTodoList: GroupTodoList = getState().groupTodoList.groupSearchTodoList;
      const message = result.data.message;

      const nextTodoList = (prevTodoList: GroupTodoList) => {
        return prevTodoList.filter((prevTodoListItem) => {
          return prevTodoListItem.id !== todoListItemId;
        });
      };

      const nextGroupExpiredTodoList = nextTodoList(prevGroupExpiredTodoList);
      const nextGroupTodayImplementationTodoList = nextTodoList(
        prevGroupTodayImplementationTodoList
      );
      const nextGroupTodayDueTodoList = nextTodoList(prevGroupTodayDueTodoList);
      const nextGroupMonthImplementationTodoList = nextTodoList(
        prevGroupMonthImplementationTodoList
      );
      const nextGroupMonthDueTodoList = nextTodoList(prevGroupMonthDueTodoList);
      const nextGroupSearchTodoList = nextTodoList(prevGroupSearchTodoList);

      dispatch(
        deleteGroupTodoListItemAction(
          nextGroupExpiredTodoList,
          nextGroupTodayImplementationTodoList,
          nextGroupTodayDueTodoList,
          nextGroupMonthImplementationTodoList,
          nextGroupMonthDueTodoList,
          nextGroupSearchTodoList
        )
      );
      dispatch(openTextModalAction(message));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const searchGroupTodoList = (
  groupId: number,
  searchGroupRequestData: {
    date_type: string;
    start_date: Date | null;
    end_date: Date | null;
    sort: string;
    sort_type: string;
    complete_flag?: boolean | string;
    todo_content?: string;
    limit?: string;
  }
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<fetchSearchGroupTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/search`,
        {
          withCredentials: true,
          params: {
            date_type: searchGroupRequestData.date_type,
            start_date: moment(searchGroupRequestData.start_date).format(),
            end_date: moment(searchGroupRequestData.end_date).format(),
            complete_flag: searchGroupRequestData.complete_flag,
            todo_content: searchGroupRequestData.todo_content,
            sort: searchGroupRequestData.sort,
            sort_type: searchGroupRequestData.sort_type,
            limit: searchGroupRequestData.limit,
          },
        }
      );
      const searchTodoList: GroupTodoList = result.data.search_todo_list;
      const message: string = result.data.message;

      if (searchTodoList === undefined) {
        const searchTodoList: GroupTodoList = [];
        dispatch(groupSearchTodoListAction(searchTodoList, message));
      } else if (message === undefined) {
        const message = '';
        dispatch(groupSearchTodoListAction(searchTodoList, message));
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
