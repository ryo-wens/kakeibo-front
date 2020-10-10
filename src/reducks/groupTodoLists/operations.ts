import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { State } from '../store/types';
import moment from 'moment';
import { createGroupTodoListItemReq, createGroupTodoListItemRes, GroupTodoListItem } from './types';
import { createGroupTodoListItemAction } from './actions';
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
  console.log(data);

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

        const nextGroupImplementationTodoLists = [
          ...prevGroupImplementationTodoLists,
          groupTodoListItem,
        ];
        const nextGroupDueTodoLists = [...prevGroupDueTodoLists, groupTodoListItem];

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
