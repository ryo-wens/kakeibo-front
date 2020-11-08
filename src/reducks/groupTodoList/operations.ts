import axios from 'axios';
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
} from './types';
import {
  createGroupTodoListItemAction,
  deleteGroupTodoListItemAction,
  editGroupTodoListItemAction,
  fetchGroupTodayTodoListAction,
  fetchGroupMonthTodoListAction,
  fetchGroupExpiredTodoListAction,
} from './actions';
import { openTextModalAction } from '../modal/actions';
import { errorHandling } from '../../lib/validation';
import { dateStringToMonthString, dateToDateString, dateToMonthString } from '../../lib/date';

export const createGroupTodoListItem = (
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
      const prevGroupTodayImplementationTodoList: GroupTodoList = getState().groupTodoList
        .groupTodayImplementationTodoList;
      const prevGroupTodayDueTodoList: GroupTodoList = getState().groupTodoList
        .groupTodayDueTodoList;
      const prevGroupMonthImplementationTodoList: GroupTodoList = getState().groupTodoList
        .groupMonthImplementationTodoList;
      const prevGroupMonthDueTodoList: GroupTodoList = getState().groupTodoList
        .groupMonthDueTodoList;

      const newTodoListItem: GroupTodoListItem = result.data;
      const responseImplementationMonth = dateStringToMonthString(result.data.implementation_date);
      const responseDueMonth = dateStringToMonthString(result.data.due_date);

      const groupTodayTodoList = (prevTodoList: GroupTodoList, responseDate: string) => {
        let nextTodoList: GroupTodoList = [];
        if (dateToDateString(today) === responseDate) {
          nextTodoList = [newTodoListItem, ...prevTodoList];
        } else if (dateToDateString(today) !== responseDate) {
          return prevTodoList;
        }
        return nextTodoList;
      };

      const groupMonthTodoList = (
        prevTodoList: GroupTodoList,
        responseMonth: string,
        responseDate: string
      ) => {
        let nextTodoList: GroupTodoList = [];
        if (dateToMonthString(selectedDate) === responseMonth) {
          let idx = 0;
          if (responseDate === result.data.implementation_date) {
            idx = prevTodoList.findIndex(
              (listItem) => listItem.implementation_date >= responseDate
            );
          } else if (responseDate === result.data.due_date) {
            idx = prevTodoList.findIndex((listItem) => listItem.due_date >= responseDate);
          }

          if (idx !== -1) {
            prevTodoList.splice(idx, 0, result.data);
          } else if (idx === -1) {
            prevTodoList.push(result.data);
          }

          nextTodoList = [...prevTodoList];
        } else if (dateToMonthString(selectedDate) !== responseMonth) {
          nextTodoList = [...prevTodoList];
        }
        return nextTodoList;
      };

      const nextGroupTodayImplementationTodoList: GroupTodoList = groupTodayTodoList(
        prevGroupTodayImplementationTodoList,
        result.data.implementation_date
      );
      const nextGroupTodayDueTodoList: GroupTodoList = groupTodayTodoList(
        prevGroupTodayDueTodoList,
        result.data.due_date
      );

      const nextGroupMonthImplementationTodoList: GroupTodoList = groupMonthTodoList(
        prevGroupMonthImplementationTodoList,
        responseImplementationMonth,
        result.data.implementation_date
      );
      const nextGroupMonthDueTodoList: GroupTodoList = groupMonthTodoList(
        prevGroupMonthDueTodoList,
        responseDueMonth,
        result.data.due_date
      );

      dispatch(
        createGroupTodoListItemAction(
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
  groupId: number,
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
      const prevGroupTodayImplementationTodoList: GroupTodoList = getState().groupTodoList
        .groupTodayImplementationTodoList;
      const prevGroupTodayDueTodoList: GroupTodoList = getState().groupTodoList
        .groupTodayDueTodoList;
      const prevGroupMonthImplementationTodoList: GroupTodoList = getState().groupTodoList
        .groupMonthImplementationTodoList;
      const prevGroupMonthDueTodoList: GroupTodoList = getState().groupTodoList
        .groupMonthDueTodoList;

      const responseImplementationMonth = dateStringToMonthString(result.data.implementation_date);
      const responseDueMonth = dateStringToMonthString(result.data.due_date);

      const updateGroupTodayTodoList = (prevTodoList: GroupTodoList, responseDate: string) => {
        let nextTodoList: GroupTodoList = [];
        const prevItemIdx = prevTodoList.findIndex(
          (listItem: GroupTodoListItem) => listItem.id === result.data.id
        );

        if (dateToDateString(today) === responseDate) {
          prevTodoList[prevItemIdx] = result.data;
          nextTodoList = [...prevTodoList];
        } else if (dateToDateString(today) !== responseDate) {
          nextTodoList = [...prevTodoList];
        }
        return nextTodoList;
      };

      const updateGroupMonthTodoList = (
        prevTodoList: GroupTodoList,
        responseMonth: string,
        responseDate: string
      ) => {
        let nextTodoList: GroupTodoList = [];
        let idx = 0;
        const prevItemIdx = prevTodoList.findIndex(
          (listItem: GroupTodoListItem) => listItem.id === result.data.id
        );

        let prevTodoListItemDate = '';
        if (prevTodoList === prevGroupMonthImplementationTodoList) {
          prevTodoListItemDate = prevTodoList[prevItemIdx].implementation_date;
        } else if (prevTodoList === prevGroupMonthDueTodoList) {
          prevTodoListItemDate = prevTodoList[prevItemIdx].due_date;
        }

        if (dateToMonthString(selectedDate) === responseMonth) {
          if (prevTodoListItemDate === responseDate) {
            prevTodoList[prevItemIdx] = result.data;
            nextTodoList = [...prevTodoList];
          } else if (prevTodoListItemDate !== responseDate) {
            prevTodoList.splice(prevItemIdx, 1);

            idx = prevTodoList.findIndex((listItem) => {
              if (responseDate === listItem.implementation_date) {
                return listItem.implementation_date >= responseDate;
              } else if (responseDate === listItem.due_date) {
                return listItem.due_date >= responseDate;
              }
            });

            if (idx !== -1) {
              prevTodoList.splice(idx, 0, result.data);
            } else if (idx === -1) {
              prevTodoList.push(result.data);
            }

            nextTodoList = [...prevTodoList];
          }
        } else if (dateToMonthString(selectedDate) !== responseMonth) {
          prevTodoList.splice(prevItemIdx, 1);
          nextTodoList = [...prevTodoList];
        }
        return nextTodoList;
      };

      const updateTodayImplementationTodoLists: GroupTodoList = updateGroupTodayTodoList(
        prevGroupTodayImplementationTodoList,
        result.data.implementation_date
      );
      const updateTodayDueTodoLists: GroupTodoList = updateGroupTodayTodoList(
        prevGroupTodayDueTodoList,
        result.data.due_date
      );
      const updateMonthImplementationTodoList: GroupTodoList = updateGroupMonthTodoList(
        prevGroupMonthImplementationTodoList,
        responseImplementationMonth,
        result.data.implementation_date
      );
      const updateMonthDueTodoLists: GroupTodoList = updateGroupMonthTodoList(
        prevGroupMonthDueTodoList,
        responseDueMonth,
        result.data.due_date
      );

      dispatch(
        editGroupTodoListItemAction(
          updateTodayImplementationTodoLists,
          updateTodayDueTodoLists,
          updateMonthImplementationTodoList,
          updateMonthDueTodoLists
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
  date: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<fetchGroupDateTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}-${date}`,
        {
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
      errorHandling(dispatch, error);
    }
  };
};

export const fetchGroupMonthTodoList = (groupId: number, year: string, month: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<fetchGroupMonthTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}`,
        {
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
      errorHandling(dispatch, error);
    }
  };
};

export const fetchGroupExpiredTodoList = (groupId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<fetchGroupExpiredTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/expired`,
        {
          withCredentials: true,
        }
      );
      const groupExpiredTodoList: GroupTodoList = result.data.expired_group_todo_list;

      dispatch(fetchGroupExpiredTodoListAction(groupExpiredTodoList));
    } catch (error) {
      errorHandling(dispatch, error);
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
      const prevGroupTodayImplementationTodoList: GroupTodoList = getState().groupTodoList
        .groupTodayImplementationTodoList;
      const prevGroupTodayDueTodoList: GroupTodoList = getState().groupTodoList
        .groupTodayDueTodoList;
      const prevGroupMonthImplementationTodoList: GroupTodoList = getState().groupTodoList
        .groupMonthImplementationTodoList;
      const prevGroupMonthDueTodoList: GroupTodoList = getState().groupTodoList
        .groupMonthDueTodoList;
      const message = result.data.message;

      const updateTodoList = (prevTodoList: GroupTodoList) => {
        return prevTodoList.filter((prevTodoListItem) => {
          return prevTodoListItem.id !== todoListItemId;
        });
      };

      const updateGroupTodayImplementationTodoList = updateTodoList(
        prevGroupTodayImplementationTodoList
      );
      const updateGroupTodayDueTodoList = updateTodoList(prevGroupTodayDueTodoList);
      const updateGroupMonthImplementationTodoList = updateTodoList(
        prevGroupMonthImplementationTodoList
      );
      const updateGroupMonthDueTodoList = updateTodoList(prevGroupMonthDueTodoList);

      dispatch(
        deleteGroupTodoListItemAction(
          updateGroupTodayImplementationTodoList,
          updateGroupTodayDueTodoList,
          updateGroupMonthImplementationTodoList,
          updateGroupMonthDueTodoList
        )
      );
      dispatch(openTextModalAction(message));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
