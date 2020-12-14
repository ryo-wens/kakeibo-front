import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as TodoListsActions from '../../src/reducks/todoList/actions';
import * as ModalActions from '../../src/reducks/modal/actions';
import {
  createTodoListItem,
  deleteTodoListItem,
  editTodoListItem,
  fetchDateTodoList,
  fetchExpiredTodoList,
  fetchMonthTodoList,
  searchTodoList,
} from '../../src/reducks/todoList/operations';
import createTodoListItemResponse from './createTodoListItemResponse.json';
import editTodoListItemResponse from './editTodoListItemResponse.json';
import fetchDateTodoListResponse from './fetchDateTodoListResponse.json';
import fetchMonthTodoListResponse from './fetchMonthTodoListResponse.json';
import fetchExpiredTodoListResponse from './fetchExpiredTodoListResponse.json';
import deleteTodoListItemResponse from './deleteTodoListItemResponse.json';
import searchTodoListResponse from './searchTodoListResponse.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new MockAdapter(axios);

const store = mockStore({ todoLists: [], modal: [], router: [] });

const getState = () => {
  return {
    todoList: {
      expiredTodoList: [
        {
          id: 1,
          posted_date: '2020-09-25T10:54:46Z',
          updated_date: '2020-09-25T10:54:46Z',
          implementation_date: '2020/09/25(金)',
          due_date: '2020/09/25(金)',
          todo_content: '携帯支払い',
          complete_flag: false,
        },
      ],
      todayImplementationTodoList: [
        {
          id: 2,
          posted_date: '2020-09-27T10:54:46Z',
          updated_date: '2020-09-27T10:54:46Z',
          implementation_date: '2020/09/27(日)',
          due_date: '2020/09/28(月)',
          todo_content: '食器用洗剤2つ購入',
          complete_flag: false,
        },
      ],
      todayDueTodoList: [],
      todayTodoListMessage: '',
      monthImplementationTodoList: [
        {
          id: 1,
          posted_date: '2020-09-25T10:54:46Z',
          updated_date: '2020-09-25T10:54:46Z',
          implementation_date: '2020/09/25(金)',
          due_date: '2020/09/25(金)',
          todo_content: '携帯支払い',
          complete_flag: false,
        },
        {
          id: 2,
          posted_date: '2020-09-27T10:54:46Z',
          updated_date: '2020-09-27T10:54:46Z',
          implementation_date: '2020/09/27(日)',
          due_date: '2020/09/28(月)',
          todo_content: '食器用洗剤2つ購入',
          complete_flag: false,
        },
      ],
      monthDueTodoList: [
        {
          id: 1,
          posted_date: '2020-09-25T10:54:46Z',
          updated_date: '2020-09-25T10:54:46Z',
          implementation_date: '2020/09/25(金)',
          due_date: '2020/09/25(金)',
          todo_content: '携帯支払い',
          complete_flag: false,
        },
        {
          id: 2,
          posted_date: '2020-09-27T10:54:46Z',
          updated_date: '2020-09-27T10:54:46Z',
          implementation_date: '2020/09/27(日)',
          due_date: '2020/09/28(月)',
          todo_content: '食器用洗剤2つ購入',
          complete_flag: false,
        },
      ],
      monthTodoListMessage: '',
      searchTodoList: [],
      searchTodoListMessage: '',
    },
    modal: {
      message: '',
      open: false,
    },
    router: {
      action: 'PUSH',
      location: {
        hash: '',
        key: 'hogeho',
        pathname: '/todo',
        search: '',
        state: undefined,
      },
    },
  };
};

describe('async actions todoLists', () => {
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

  it('If CREATE_TODO_LIST_ITEM is successful, the created todoListItem will be added to the groupTodoList managed by the store.', async () => {
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list`;
    const today = new Date();
    const selectedDate = new Date('2020-09-27T00:00:00');
    const implementationDate = new Date('2020-09-28T00:00:00Z');
    const dueDate = new Date('2020-09-29T00:00:00Z');
    const todoContent = '買い物へゆく';

    const mockResponse = JSON.stringify(createTodoListItemResponse);

    const expectedAction = [
      {
        type: TodoListsActions.CREATE_TODO_LIST_ITEM,
        payload: {
          expiredTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
            },
          ],
          todayImplementationTodoList: [
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
            },
          ],
          todayDueTodoList: [],
          monthImplementationTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
            },
            {
              id: 3,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/28(月)',
              due_date: '2020/09/29(火)',
              todo_content: '買い物へゆく',
              complete_flag: false,
            },
          ],
          monthDueTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
            },
            {
              id: 3,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/28(月)',
              due_date: '2020/09/29(火)',
              todo_content: '買い物へゆく',
              complete_flag: false,
            },
          ],
        },
      },
    ];

    axiosMock.onPost(url).reply(200, mockResponse);

    await createTodoListItem(
      today,
      selectedDate,
      implementationDate,
      dueDate,
      todoContent
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Updated todoListItem will be reflected in todayImplementationTodoList and todayDueTodoLists if EDIT_TODO_LIST_ITEM is successful.', async () => {
    const todoListItemId = 2;
    const completeFlag = true;
    const today = new Date();
    const selectedDate = new Date('2020-09-27T00:00:00');
    const implementationDate = new Date('2020-09-27T00:00:00');
    const dueDate = new Date('2020-09-28T00:00:00');
    const todoContent = 'お掃除';

    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`;

    const mockResponse = JSON.stringify(editTodoListItemResponse);

    const expectedAction = [
      {
        type: TodoListsActions.EDIT_TODO_LIST_ITEM,
        payload: {
          expiredTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
            },
          ],
          todayImplementationTodoList: [
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:56:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: 'お掃除',
              complete_flag: true,
            },
          ],
          todayDueTodoList: [],
          monthImplementationTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:56:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: 'お掃除',
              complete_flag: true,
            },
          ],
          monthDueTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:56:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: 'お掃除',
              complete_flag: true,
            },
          ],
        },
      },
    ];

    axiosMock.onPut(url).reply(200, mockResponse);

    await editTodoListItem(
      todoListItemId,
      today,
      selectedDate,
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

  it('Get todayImplementationTodoList and todayDueTodoLists when FETCH_DATE_TODO_LIST succeeds.', async () => {
    const year = '2020';
    const month = '09';
    const date = '27';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}-${date}`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchDateTodoListResponse);

    const expectedAction = [
      {
        type: TodoListsActions.FETCH_DATE_TODO_LIST,
        payload: {
          todayImplementationTodoList: [
            {
              id: 3,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/27(日)',
              todo_content: '買い物へ行く',
              complete_flag: false,
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
            },
          ],
          todayDueTodoList: [
            {
              id: 3,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/27(日)',
              todo_content: '買い物へ行く',
              complete_flag: false,
            },
          ],
          todayTodoListMessage: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchDateTodoList(year, month, date, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Get monthImplementationTodoList and monthDueTodoList when FETCH_MONTH_TODO_LIST succeeds.', async () => {
    const year = '2020';
    const month = '09';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchMonthTodoListResponse);

    const expectedAction = [
      {
        type: TodoListsActions.FETCH_MONTH_TODO_LIST,
        payload: {
          monthImplementationTodoList: [
            {
              id: 3,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/27(日)',
              todo_content: '買い物へ行く',
              complete_flag: false,
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
            },
          ],
          monthDueTodoList: [
            {
              id: 3,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/27(日)',
              todo_content: '買い物へ行く',
              complete_flag: false,
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
            },
          ],
          monthTodoListMessage: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchMonthTodoList(year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Get expiredTodoList when FETCH_EXPIRED_TODO_LIST succeeds.', async () => {
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/expired`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchExpiredTodoListResponse);

    const expectedAction = [
      {
        type: TodoListsActions.FETCH_EXPIRED_TODO_LIST,
        payload: {
          expiredTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
            },
          ],
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchExpiredTodoList(signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('When DELETE_TODO_LIST_ITEM is successful, remove the todoListItem of the selected todoListItemId from the todoList managed by the store, send it to deleteTodoListItemAction, and send the response message to openTextModalAction.', async () => {
    const todoListItemId = 2;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`;

    const mockResponse = JSON.stringify(deleteTodoListItemResponse);

    const expectedAction = [
      {
        type: TodoListsActions.DELETE_TODO_LIST_ITEM,
        payload: {
          expiredTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
            },
          ],
          todayImplementationTodoList: [],
          todayDueTodoList: [],
          monthImplementationTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
            },
          ],
          monthDueTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
            },
          ],
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
    await deleteTodoListItem(todoListItemId)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it("get searchTodoList  search criteria match in  if fetch succeeds'", async () => {
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/search`;

    const params = {
      date_type: 'implementation_date',
      start_date: new Date('2020-09-01T00:00:00'),
      end_date: new Date('2020-09-30T00:00:00'),
      sort: 'implementation_date',
      sort_type: 'desc',
    };

    const mockResponse = JSON.stringify(searchTodoListResponse);

    const expectedAction = [
      {
        type: TodoListsActions.SEARCH_TODO_LIST,
        payload: {
          searchTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
            },
          ],
          searchTodoListMessage: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await searchTodoList(params)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
