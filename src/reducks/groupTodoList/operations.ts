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
  fetchGroupDateTodoListsRes,
  fetchGroupMonthTodoListsRes,
  GroupTodoListItem,
  GroupTodoList,
} from './types';
import {
  createGroupTodoListItemAction,
  deleteGroupTodoListItemAction,
  editGroupTodoListItemAction,
  fetchGroupTodayTodoListAction,
  fetchGroupMonthTodoListAction,
} from './actions';
import { openTextModalAction } from '../modal/actions';
import { errorHandling } from '../../lib/validation';

export const createGroupTodoListItem = (
  groupId: number,
  implementationDate: Date | null,
  dueDate: Date | null,
  todoContent: string
) => {
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

  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    await axios
      .post<createGroupTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list`,
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
        const prevGroupTodayImplementationTodoList = getState().groupTodoList
          .groupTodayImplementationTodoList;
        const prevGroupTodayDueTodoList = getState().groupTodoList.groupTodayDueTodoList;

        const groupTodoListItem: GroupTodoListItem = res.data;

        const nextGroupImplementationTodoLists: GroupTodoList = [
          groupTodoListItem,
          ...prevGroupTodayImplementationTodoList,
        ];
        const nextGroupDueTodoLists: GroupTodoList = [
          groupTodoListItem,
          ...prevGroupTodayDueTodoList,
        ];

        dispatch(
          createGroupTodoListItemAction(nextGroupImplementationTodoLists, nextGroupDueTodoLists)
        );
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const editGroupTodoListItem = (
  groupId: number,
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

    const data: editGroupTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: completeFlag,
    };

    await axios
      .put<editGroupTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`,
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
        const prevGroupTodayImplementationTodoList: GroupTodoList = getState().groupTodoList
          .groupTodayImplementationTodoList;
        const prevGroupTodayDueTodoList: GroupTodoList = getState().groupTodoList
          .groupTodayDueTodoList;

        const updateGroupTodoList = (prevGroupTodoList: GroupTodoList) => {
          return prevGroupTodoList.map((prevGroupTodoList: GroupTodoListItem) => {
            if (prevGroupTodoList.id === todoListItemId) {
              const updateGroupTodoListItem: GroupTodoListItem = res.data;
              return updateGroupTodoListItem;
            } else {
              return prevGroupTodoList;
            }
          });
        };

        const updateGroupImplementationTodoLists: GroupTodoList = updateGroupTodoList(
          prevGroupTodayImplementationTodoList
        );
        const updateGroupDueTodoLists: GroupTodoList = updateGroupTodoList(
          prevGroupTodayDueTodoList
        );

        dispatch(
          editGroupTodoListItemAction(updateGroupImplementationTodoLists, updateGroupDueTodoLists)
        );
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
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
      const result = await axios.get<fetchGroupDateTodoListsRes>(
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
      const result = await axios.get<fetchGroupMonthTodoListsRes>(
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
