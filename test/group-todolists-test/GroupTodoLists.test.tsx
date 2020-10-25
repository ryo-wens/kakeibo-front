import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as GroupTodoListsActions from '../../src/reducks/groupTodoLists/actions';
import createGroupTodoListItemResponse from './createGroupTodoListItemResponse.json';
import editGroupTodoListItemResponse from './editGroupTodoListItemResponse.json';
import fetchGroupDateTodoListsResponse from './fetchGroupDateTodoListsResponse.json';
import fetchGroupMonthTodoListsResponse from './fetchGroupMonthTodoListsResponse.json';
import deleteGroupTodoListItemResponse from './deleteGroupTodoListItemResponse.json';
import {
  createGroupTodoListItem,
  deleteGroupTodoListItem,
  editGroupTodoListItem,
  fetchGroupDateTodoLists,
  fetchGroupMonthTodoLists,
} from '../../src/reducks/groupTodoLists/operations';
import * as ModalActions from '../../src/reducks/modal/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ groupTodoLists: [], modal: [], router: [] });

const axiosMock = new MockAdapter(axios);

const getState = () => {
  return {
    groupTodoLists: {
      groupImplementationTodoLists: [
        {
          id: 1,
          posted_date: '2020-09-27T19:54:46Z',
          implementation_date: '09/27(日)',
          due_date: '09/28(月)',
          todo_content: '食器用洗剤2つ購入',
          complete_flag: false,
          user_id: 'furusawa',
        },
      ],
      groupDueTodoLists: [
        {
          id: 1,
          posted_date: '2020-09-27T19:54:46Z',
          implementation_date: '09/27(日)',
          due_date: '09/28(月)',
          todo_content: '食器用洗剤2つ購入',
          complete_flag: false,
          user_id: 'furusawa',
        },
      ],
      message: '',
    },
    modal: { message: '', open: false },
    router: {
      action: 'PUSH',
      location: {
        hash: '',
        key: 'hogeho',
        pathname: '/groups-todo/1',
        search: '',
        state: undefined,
      },
    },
  };
};

describe('async actions groupTodoLists', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Created groupTodoListItem is added to groupImplementationTodoLists and groupDueTodoLists when CREATE_GROUP_TODO_LIST_ITEM succeeds.', async () => {
    const groupId = 1;
    const todoContent = 'お掃除';
    const implementationDate = new Date('2020-09-27T21:11:54');
    const dueDate = new Date('2020-09-29T21:11:54');
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list`;

    const mockResponse = JSON.stringify(createGroupTodoListItemResponse);

    const expectedAction = [
      {
        type: GroupTodoListsActions.CREATE_GROUP_TODO_LIST_ITEM,
        payload: {
          groupImplementationTodoLists: [
            {
              id: 2,
              posted_date: '2020-09-27T14:50:00Z',
              implementation_date: '09/27(日)',
              due_date: '09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 1,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupDueTodoLists: [
            {
              id: 2,
              posted_date: '2020-09-27T14:50:00Z',
              implementation_date: '09/27(日)',
              due_date: '09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 1,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
        },
      },
    ];

    axiosMock.onPost(url).reply(200, mockResponse);

    // @ts-ignore
    await createGroupTodoListItem(
      groupId,
      implementationDate,
      dueDate,
      todoContent
    )(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Updated groupTodoListItem will be reflected in groupImplementationTodoLists and groupDueTodoLists if EDIT_GROUP_TODO_LIST_ITEM is successful.', async () => {
    const groupId = 1;
    const todoListItemId = 1;
    const implementationDate = new Date('2020-09-27T21:11:54');
    const dueDate = new Date('2020-09-28T21:11:54');
    const todoContent = '買い物へ行く';
    const completeFlag = false;

    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`;

    const mockResponse = JSON.stringify(editGroupTodoListItemResponse);

    const expectedAction = [
      {
        type: GroupTodoListsActions.EDIT_GROUP_TODO_LIST_ITEM,
        payload: {
          groupImplementationTodoLists: [
            {
              id: 1,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/28(月)',
              todo_content: '買い物へ行く',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupDueTodoLists: [
            {
              id: 1,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/28(月)',
              todo_content: '買い物へ行く',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
        },
      },
    ];

    axiosMock.onPut(url).reply(200, mockResponse);

    await editGroupTodoListItem(
      groupId,
      todoListItemId,
      implementationDate,
      dueDate,
      todoContent,
      completeFlag
    )(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Get groupImplementationTodoLists and groupDueTodoLists when FETCH_GROUP_DATE_TODO_LISTS succeeds.', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '09';
    const date = '27';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}-${date}`;

    const mockResponse = JSON.stringify(fetchGroupDateTodoListsResponse);

    const expectedAction = [
      {
        type: GroupTodoListsActions.FETCH_GROUP_DATE_TODO_LISTS,
        payload: {
          groupImplementationTodoLists: [
            {
              id: 2,
              posted_date: '2020-09-27T14:50:00Z',
              implementation_date: '09/27(日)',
              due_date: '09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 1,
              posted_date: '2020-09-27T14:40:00Z',
              implementation_date: '09/27(日)',
              due_date: '09/27(日)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupDueTodoLists: [
            {
              id: 1,
              posted_date: '2020-09-27T14:40:00Z',
              implementation_date: '09/27(日)',
              due_date: '09/27(日)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          message: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupDateTodoLists(groupId, year, month, date)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Get groupImplementationTodoLists and groupDueTodoLists when FETCH_GROUP_MONTH_TODO_LISTS succeeds.', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '09';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}`;

    const mockResponse = JSON.stringify(fetchGroupMonthTodoListsResponse);

    const expectedAction = [
      {
        type: GroupTodoListsActions.FETCH_GROUP_MONTH_TODO_LISTS,
        payload: {
          groupImplementationTodoLists: [
            {
              id: 2,
              posted_date: '2020-09-27T14:50:00Z',
              implementation_date: '09/27(日)',
              due_date: '09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 1,
              posted_date: '2020-09-27T14:40:00Z',
              implementation_date: '09/27(日)',
              due_date: '09/27(日)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupDueTodoLists: [
            {
              id: 2,
              posted_date: '2020-09-27T14:50:00Z',
              implementation_date: '09/27(日)',
              due_date: '09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 1,
              posted_date: '2020-09-27T14:40:00Z',
              implementation_date: '09/27(日)',
              due_date: '09/27(日)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          message: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupMonthTodoLists(groupId, year, month)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('When DELETE_GROUP_TODO_LIST_ITEM is successful, send the groupImplementationTodoLists and groupDueTodoLists except the requested todoListItemId to deleteGroupTodoListItemAction and send the response message to openTextModalAction.', async () => {
    const groupId = 1;
    const todoListItemId = 1;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`;

    const mockResponse = JSON.stringify(deleteGroupTodoListItemResponse);

    const expectedAction = [
      {
        type: GroupTodoListsActions.DELETE_GROUP_TODO_LIST_ITEM,
        payload: {
          groupImplementationTodoLists: [],
          groupDueTodoLists: [],
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: 'todoを削除しました。',
          open: true,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);

    // @ts-ignore
    await deleteGroupTodoListItem(groupId, todoListItemId)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
