import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { State } from '../store/types';
import moment from 'moment';
import {
  createGroupTodoListItemReq,
  createGroupTodoListItemRes,
  fetchGroupDateTodoListsRes,
  fetchGroupMonthTodoListsRes,
  GroupTodoListItem,
  GroupTodoLists,
} from './types';
import {
  createGroupTodoListItemAction,
  fetchGroupDateTodoListsAction,
  fetchGroupMonthTodoListsAction,
} from './actions';
import { push } from 'connected-react-router';

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
        `http://127.0.0.1:8082/groups/${groupId}/todo-list`,
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

export const fetchGroupDateTodoLists = (
  groupId: number,
  year: string,
  month: string,
  date: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get<fetchGroupDateTodoListsRes>(
        `http://127.0.0.1:8082/groups/${groupId}/todo-list/${year}-${month}-${date}`,
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
        `http://127.0.0.1:8082/groups/${groupId}/todo-list/${year}-${month}`,
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
