import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as GroupTodoListsActions from '../../src/reducks/groupTodoList/actions';
import createGroupTodoListItemResponse from './createGroupTodoListItemResponse.json';
import editGroupTodoListItemResponse from './editGroupTodoListItemResponse.json';
import fetchGroupTodayTodoListResponse from './fetchGroupTodayTodoListResponse.json';
import fetchGroupMonthTodoListsResponse from './fetchGroupMonthTodoListsResponse.json';
import deleteGroupTodoListItemResponse from './deleteGroupTodoListItemResponse.json';
import {
  createGroupTodoListItem,
  deleteGroupTodoListItem,
  editGroupTodoListItem,
  fetchGroupTodayTodoList,
  fetchGroupMonthTodoList,
} from '../../src/reducks/groupTodoList/operations';
import * as ModalActions from '../../src/reducks/modal/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ groupTodoLists: [], modal: [], router: [] });

const axiosMock = new MockAdapter(axios);

const getState = () => {
  return {
    groupTodoList: {
      groupTodayImplementationTodoList: [
        {
          id: 1,
          posted_date: '2020-09-27T10:54:46Z',
          updated_date: '2020-09-27T10:54:46Z',
          implementation_date: '2020/09/27(日)',
          due_date: '2020/09/28(月)',
          todo_content: '食器用洗剤2つ購入',
          complete_flag: false,
          user_id: 'furusawa',
        },
      ],
      groupTodayDueTodoList: [],
      groupTodayTodoListMessage: '',
      groupMonthImplementationTodoList: [
        {
          id: 1,
          posted_date: '2020-09-27T10:54:46Z',
          updated_date: '2020-09-27T10:54:46Z',
          implementation_date: '2020/09/27(日)',
          due_date: '2020/09/28(月)',
          todo_content: '食器用洗剤2つ購入',
          complete_flag: false,
          user_id: 'furusawa',
        },
      ],
      groupMonthDueTodoList: [
        {
          id: 1,
          posted_date: '2020-09-27T10:54:46Z',
          updated_date: '2020-09-27T10:54:46Z',
          implementation_date: '2020/09/27(日)',
          due_date: '2020/09/28(月)',
          todo_content: '食器用洗剤2つ購入',
          complete_flag: false,
          user_id: 'furusawa',
        },
      ],
      groupMonthTodoListMessage: '',
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

  let now: Date;
  let spiedDate: Date;

  const originalDate = Date;
  now = new originalDate('2020-09-27T10:54:46Z');
  Date.now = jest.fn().mockReturnValue(now.valueOf());

  // @ts-ignore
  spiedDate = jest.spyOn(global, 'Date').mockImplementation((arg) => {
    if (arg === 0 || arg) {
      return new originalDate(arg);
    }
    return now;
  });

  afterAll(() => {
    // @ts-ignore
    spiedDate.mockRestore();
  });

  it('Created groupTodoListItem is added to groupImplementationTodoLists and groupDueTodoLists when CREATE_GROUP_TODO_LIST_ITEM succeeds.', async () => {
    const groupId = 1;
    const today = new Date();
    const selectedDate = new Date('2020-09-27T00:00:00');
    const implementationDate = new Date('2020-09-27T00:00:00');
    const dueDate = new Date('2020-09-29T00:00:00');
    const todoContent = 'お掃除';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list`;

    const mockResponse = JSON.stringify(createGroupTodoListItemResponse);

    const expectedAction = [
      {
        type: GroupTodoListsActions.CREATE_GROUP_TODO_LIST_ITEM,
        payload: {
          groupTodayImplementationTodoList: [
            {
              id: 2,
              posted_date: '2020-09-27T10:57:46Z',
              updated_date: '2020-09-27T10:57:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 1,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupTodayDueTodoList: [],
          groupMonthImplementationTodoList: [
            {
              id: 2,
              posted_date: '2020-09-27T10:57:46Z',
              updated_date: '2020-09-27T10:57:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 1,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupMonthDueTodoList: [
            {
              id: 1,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:57:46Z',
              updated_date: '2020-09-27T10:57:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/29(火)',
              todo_content: 'お掃除',
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
      today,
      selectedDate,
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
    const implementationDate = new Date('2020-09-27T00:00:00');
    const dueDate = new Date('2020-09-28T00:00:00');
    const todoContent = '買い物へ行く';
    const completeFlag = false;

    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`;

    const mockResponse = JSON.stringify(editGroupTodoListItemResponse);

    const expectedAction = [
      {
        type: GroupTodoListsActions.EDIT_GROUP_TODO_LIST_ITEM,
        payload: {
          groupTodayImplementationTodoList: [
            {
              id: 1,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '買い物へ行く',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupTodayDueTodoList: [],
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

    const mockResponse = JSON.stringify(fetchGroupTodayTodoListResponse);

    const expectedAction = [
      {
        type: GroupTodoListsActions.FETCH_GROUP_TODAY_TODO_LIST,
        payload: {
          groupTodayImplementationTodoList: [
            {
              id: 2,
              posted_date: '2020-09-27T10:57:46Z',
              updated_date: '2020-09-27T10:57:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 1,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/27(日)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupTodayDueTodoList: [
            {
              id: 1,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/27(日)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupTodayTodoListMessage: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupTodayTodoList(groupId, year, month, date)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Get groupMonthImplementationTodoList and groupMonthDueTodoList when FETCH_GROUP_MONTH_TODO_LIST succeeds.', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '09';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}`;

    const mockResponse = JSON.stringify(fetchGroupMonthTodoListsResponse);

    const expectedAction = [
      {
        type: GroupTodoListsActions.FETCH_GROUP_MONTH_TODO_LIST,
        payload: {
          groupMonthImplementationTodoList: [
            {
              id: 2,
              posted_date: '2020-09-27T10:57:46Z',
              updated_date: '2020-09-27T10:57:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 1,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/27(日)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupMonthDueTodoList: [
            {
              id: 2,
              posted_date: '2020-09-27T10:57:46Z',
              updated_date: '2020-09-27T10:57:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 1,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/27(日)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupMonthTodoListMessage: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupMonthTodoList(groupId, year, month)(store.dispatch);
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
          groupTodayImplementationTodoList: [],
          groupTodayDueTodoList: [],
          groupMonthImplementationTodoList: [],
          groupMonthDueTodoList: [],
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
