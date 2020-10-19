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
  GroupTodoLists,
} from './types';
import {
  createGroupTodoListItemAction,
  deleteGroupTodoListItemAction,
  editGroupTodoListItemAction,
  fetchGroupDateTodoListsAction,
  fetchGroupMonthTodoListsAction,
} from './actions';
import { push } from 'connected-react-router';
import { openTextModalAction } from '../modal/actions';

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
        const prevGroupImplementationTodoLists = getState().groupTodoLists
          .groupImplementationTodoLists;
        const prevGroupDueTodoLists = getState().groupTodoLists.groupDueTodoLists;

        const groupTodoListItem: GroupTodoListItem = res.data;

        const nextGroupImplementationTodoLists: GroupTodoLists = [
          ...prevGroupImplementationTodoLists,
          groupTodoListItem,
        ];
        const nextGroupDueTodoLists: GroupTodoLists = [...prevGroupDueTodoLists, groupTodoListItem];

        dispatch(
          createGroupTodoListItemAction(nextGroupImplementationTodoLists, nextGroupDueTodoLists)
        );
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
        const prevGroupImplementationTodoLists: GroupTodoLists = getState().groupTodoLists
          .groupImplementationTodoLists;
        const prevGroupDueTodoLists: GroupTodoLists = getState().groupTodoLists.groupDueTodoLists;

        const updateGroupTodoLists = (prevGroupTodoLists: GroupTodoLists) => {
          return prevGroupTodoLists.map((prevGroupTodoList: GroupTodoListItem) => {
            if (prevGroupTodoList.id === todoListItemId) {
              const updateGroupTodoListItem: GroupTodoListItem = res.data;
              return updateGroupTodoListItem;
            } else {
              return prevGroupTodoList;
            }
          });
        };

        const updateGroupImplementationTodoLists: GroupTodoLists = updateGroupTodoLists(
          prevGroupImplementationTodoLists
        );
        const updateGroupDueTodoLists: GroupTodoLists = updateGroupTodoLists(prevGroupDueTodoLists);

        dispatch(
          editGroupTodoListItemAction(updateGroupImplementationTodoLists, updateGroupDueTodoLists)
        );
      })
      .catch((error) => {
        if (error && error.response) {
          alert(error.response.data.error.message);
          if (error.response.status === 401) {
            dispatch(push('/login'));
          }
        } else {
          alert(error);
        }
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
          const groupImplementationTodoLists: GroupTodoLists = [];
          const groupDueTodoLists: GroupTodoLists = [];
          dispatch(
            fetchGroupDateTodoListsAction(groupImplementationTodoLists, groupDueTodoLists, message)
          );
        }
      })
      .catch((error) => {
        if (error && error.response) {
          alert(error.response.data.error.message);
          if (error.response.status === 401) {
            dispatch(push('/login'));
          }
        } else {
          alert(error);
        }
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
          const groupImplementationTodoLists: GroupTodoLists = [];
          const groupDueTodoLists: GroupTodoLists = [];
          dispatch(
            fetchGroupMonthTodoListsAction(groupImplementationTodoLists, groupDueTodoLists, message)
          );
        }
      })
      .catch((error) => {
        if (error && error.response) {
          alert(error.response.data.error.message);
          if (error.response.status === 401) {
            dispatch(push('/login'));
          }
        } else {
          alert(error);
        }
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
        const prevGroupImplementationTodoLists: GroupTodoLists = getState().groupTodoLists
          .groupImplementationTodoLists;
        const prevGroupDueTodoLists: GroupTodoLists = getState().groupTodoLists.groupDueTodoLists;
        const message = res.data.message;

        const updateGroupTodoLists = (prevGroupTodoLists: GroupTodoLists) => {
          return prevGroupTodoLists.filter((prevGroupTodoList) => {
            return prevGroupTodoList.id !== todoListItemId;
          });
        };

        const updateGroupImplementationTodoLists: GroupTodoLists = updateGroupTodoLists(
          prevGroupImplementationTodoLists
        );
        const updateGroupDueTodoLists: GroupTodoLists = updateGroupTodoLists(prevGroupDueTodoLists);

        dispatch(
          deleteGroupTodoListItemAction(updateGroupImplementationTodoLists, updateGroupDueTodoLists)
        );
        dispatch(openTextModalAction(message));
      })
      .catch((error) => {
        if (error && error.response) {
          alert(error.response.data.error.message);
          if (error.response.status === 401) {
            dispatch(push('/login'));
          }
        } else {
          alert(error);
        }
      });
  };
};
