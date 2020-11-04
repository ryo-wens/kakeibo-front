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
  fetchGroupDateTodoListsAction,
  fetchGroupMonthTodoListsAction,
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

export const fetchGroupDateTodoLists = (
  groupId: number,
  year: string,
  month: string,
  date: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get<fetchGroupDateTodoListsRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}-${date}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const groupImplementationTodoLists = res.data.implementation_todo_list;
        const groupDueTodoLists = res.data.due_todo_list;
        const message = res.data.message;

        if (groupImplementationTodoLists !== undefined && groupDueTodoLists !== undefined) {
          const message = '';
          dispatch(
            fetchGroupDateTodoListsAction(groupImplementationTodoLists, groupDueTodoLists, message)
          );
        } else {
          const groupImplementationTodoLists: GroupTodoList = [];
          const groupDueTodoLists: GroupTodoList = [];
          dispatch(
            fetchGroupDateTodoListsAction(groupImplementationTodoLists, groupDueTodoLists, message)
          );
        }
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const fetchGroupMonthTodoLists = (groupId: number, year: string, month: string) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get<fetchGroupMonthTodoListsRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const groupImplementationTodoLists = res.data.implementation_todo_list;
        const groupDueTodoLists = res.data.due_todo_list;
        const message = res.data.message;

        if (groupImplementationTodoLists !== undefined && groupDueTodoLists !== undefined) {
          const message = '';
          dispatch(
            fetchGroupMonthTodoListsAction(groupImplementationTodoLists, groupDueTodoLists, message)
          );
        } else {
          const groupImplementationTodoLists: GroupTodoList = [];
          const groupDueTodoLists: GroupTodoList = [];
          dispatch(
            fetchGroupMonthTodoListsAction(groupImplementationTodoLists, groupDueTodoLists, message)
          );
        }
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const deleteGroupTodoListItem = (groupId: number, todoListItemId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    await axios
      .delete<deleteGroupTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const prevGroupTodayImplementationTodoLists: GroupTodoList = getState().groupTodoList
          .groupTodayImplementationTodoList;
        const prevGroupTodayDueTodoLists: GroupTodoList = getState().groupTodoList
          .groupTodayDueTodoList;
        const message = res.data.message;

        const updateGroupTodoList = (prevGroupTodoList: GroupTodoList) => {
          return prevGroupTodoList.filter((prevGroupTodoList) => {
            return prevGroupTodoList.id !== todoListItemId;
          });
        };

        const updateGroupImplementationTodoLists: GroupTodoList = updateGroupTodoList(
          prevGroupTodayImplementationTodoLists
        );
        const updateGroupDueTodoLists: GroupTodoList = updateGroupTodoList(
          prevGroupTodayDueTodoLists
        );

        dispatch(
          deleteGroupTodoListItemAction(updateGroupImplementationTodoLists, updateGroupDueTodoLists)
        );
        dispatch(openTextModalAction(message));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};
