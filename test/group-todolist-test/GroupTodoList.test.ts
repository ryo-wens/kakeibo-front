import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as GroupTodoListActions from '../../src/reducks/groupTodoList/actions';
import addGroupTodoListItemResponse from './addGroupTodoListItemResponse.json';
import editGroupTodoListItemResponse from './editGroupTodoListItemResponse.json';
import fetchGroupTodayTodoListResponse from './fetchGroupTodayTodoListResponse.json';
import fetchGroupMonthTodoListResponse from './fetchGroupMonthTodoListResponse.json';
import fetchGroupExpiredTodoListResponse from './fetchGroupExpiredTodoListResponse.json';
import deleteGroupTodoListItemResponse from './deleteGroupTodoListItemResponse.json';
import searchGroupTodoListResponse from './searchGroupTodoListResponse.json';
import {
  addGroupTodoListItem,
  deleteGroupTodoListItem,
  editGroupTodoListItem,
  fetchGroupTodayTodoList,
  fetchGroupMonthTodoList,
  fetchGroupExpiredTodoList,
  searchGroupTodoList,
} from '../../src/reducks/groupTodoList/operations';
import * as ModalActions from '../../src/reducks/modal/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ groupTodoLists: [], modal: [], router: [] });

const axiosMock = new MockAdapter(axios);

const getState = () => {
  return {
    groupTodoList: {
      groupExpiredTodoList: [
        {
          id: 1,
          posted_date: '2020-09-25T10:54:46Z',
          updated_date: '2020-09-25T10:54:46Z',
          implementation_date: '2020/09/25(金)',
          due_date: '2020/09/25(金)',
          todo_content: '携帯支払い',
          complete_flag: false,
          user_id: 'furusawa',
        },
      ],
      groupTodayImplementationTodoList: [
        {
          id: 2,
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
          posted_date: '2020-09-25T10:54:46Z',
          updated_date: '2020-09-25T10:54:46Z',
          implementation_date: '2020/09/25(金)',
          due_date: '2020/09/25(金)',
          todo_content: '携帯支払い',
          complete_flag: false,
          user_id: 'furusawa',
        },
        {
          id: 2,
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
          posted_date: '2020-09-25T10:54:46Z',
          updated_date: '2020-09-25T10:54:46Z',
          implementation_date: '2020/09/25(金)',
          due_date: '2020/09/25(金)',
          todo_content: '携帯支払い',
          complete_flag: false,
          user_id: 'furusawa',
        },
        {
          id: 2,
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
      groupSearchTodoList: [
        {
          id: 1,
          posted_date: '2020-09-25T10:54:46Z',
          updated_date: '2020-09-25T10:54:46Z',
          implementation_date: '2020/09/25(金)',
          due_date: '2020/09/25(金)',
          todo_content: '携帯支払い',
          complete_flag: false,
          user_id: 'furusawa',
        },
      ],
      groupSearchTodoListMessage: '',
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

  it('If CREATE_GROUP_TODO_LIST_ITEM is successful, the created todoListItem will be added to the groupTodoList managed by the store.', async () => {
    const groupId = 1;
    const today = new Date();
    const selectedDate = new Date('2020-09-27T00:00:00');
    const implementationDate = new Date('2020-09-27T00:00:00');
    const dueDate = new Date('2020-09-29T00:00:00');
    const todoContent = 'お掃除';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list`;

    const mockResponse = JSON.stringify(addGroupTodoListItemResponse);

    const expectedAction = [
      {
        type: GroupTodoListActions.ADD_GROUP_TODO_LIST_ITEM,
        payload: {
          groupExpiredTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupTodayImplementationTodoList: [
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 3,
              posted_date: '2020-09-27T10:57:46Z',
              updated_date: '2020-09-27T10:57:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupTodayDueTodoList: [],
          groupMonthImplementationTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 3,
              posted_date: '2020-09-27T10:57:46Z',
              updated_date: '2020-09-27T10:57:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupMonthDueTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 3,
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
    await addGroupTodoListItem(
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

  it('edit data in groupTodoList if fetch succeeds', async () => {
    const groupId = 1;
    const todoListItemId = 2;
    const today = new Date();
    const currentYearMonth = `2020/09`;
    const selectedDate = new Date('2020-09-27T00:00:00');
    const implementationDate = new Date('2020-09-27T00:00:00');
    const dueDate = new Date('2020-09-28T00:00:00');
    const todoContent = '買い物へ行く';
    const completeFlag = false;

    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`;

    const mockResponse = JSON.stringify(editGroupTodoListItemResponse);

    const expectedAction = [
      {
        type: GroupTodoListActions.EDIT_GROUP_TODO_LIST_ITEM,
        payload: {
          groupExpiredTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupTodayImplementationTodoList: [
            {
              id: 2,
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
          groupMonthImplementationTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '買い物へ行く',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupMonthDueTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/28(月)',
              todo_content: '買い物へ行く',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupSearchTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
        },
      },
    ];

    axiosMock.onPut(url).reply(200, mockResponse);

    await editGroupTodoListItem(
      today,
      currentYearMonth,
      groupId,
      todoListItemId,
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

  it('Get groupImplementationTodoList and groupDueTodoList when FETCH_GROUP_TODAY_TODO_LIST succeeds.', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '09';
    const date = '27';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}-${date}`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchGroupTodayTodoListResponse);

    const expectedAction = [
      {
        type: GroupTodoListActions.FETCH_GROUP_TODAY_TODO_LIST,
        payload: {
          groupTodayImplementationTodoList: [
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/27(日)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 3,
              posted_date: '2020-09-27T10:57:46Z',
              updated_date: '2020-09-27T10:57:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupTodayDueTodoList: [
            {
              id: 2,
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

    await fetchGroupTodayTodoList(groupId, year, month, date, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Get groupMonthImplementationTodoList and groupMonthDueTodoList when FETCH_GROUP_MONTH_TODO_LIST succeeds.', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '09';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchGroupMonthTodoListResponse);

    const expectedAction = [
      {
        type: GroupTodoListActions.FETCH_GROUP_MONTH_TODO_LIST,
        payload: {
          groupMonthImplementationTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 3,
              posted_date: '2020-09-27T10:57:46Z',
              updated_date: '2020-09-27T10:57:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 2,
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
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 2,
              posted_date: '2020-09-27T10:54:46Z',
              updated_date: '2020-09-27T10:54:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/27(日)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
              user_id: 'furusawa',
            },
            {
              id: 3,
              posted_date: '2020-09-27T10:57:46Z',
              updated_date: '2020-09-27T10:57:46Z',
              implementation_date: '2020/09/27(日)',
              due_date: '2020/09/29(火)',
              todo_content: 'お掃除',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupMonthTodoListMessage: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupMonthTodoList(groupId, year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Get groupExpiredTodoList when FETCH_GROUP_EXPIRED_TODO_LIST succeeds.', async () => {
    const groupId = 1;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/expired`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchGroupExpiredTodoListResponse);

    const expectedAction = [
      {
        type: GroupTodoListActions.FETCH_GROUP_EXPIRED_TODO_LIST,
        payload: {
          groupExpiredTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupExpiredTodoList(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('If DELETE_GROUP_TODO_LIST_ITEM is successful, the selected todoListItem is excluded　from the groupTodoList managed by the store and send the response message to openTextModalAction.', async () => {
    const groupId = 1;
    const todoListItemId = 2;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`;

    const mockResponse = JSON.stringify(deleteGroupTodoListItemResponse);

    const expectedAction = [
      {
        type: GroupTodoListActions.DELETE_GROUP_TODO_LIST_ITEM,
        payload: {
          groupExpiredTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupTodayImplementationTodoList: [],
          groupTodayDueTodoList: [],
          groupMonthImplementationTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupMonthDueTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupSearchTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
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
    await deleteGroupTodoListItem(groupId, todoListItemId)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it("get searchGroupTodoList  search criteria match in  if fetch succeeds'", async () => {
    const groupId = 1;

    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/search`;

    const params = {
      date_type: 'implementation_date',
      start_date: new Date('2020-09-01T00:00:00'),
      end_date: new Date('2020-09-30T00:00:00'),
      sort: 'implementation_date',
      sort_type: 'desc',
    };

    const mockResponse = JSON.stringify(searchGroupTodoListResponse);

    const expectedAction = [
      {
        type: GroupTodoListActions.SEARCH_GROUP_TODO_LIST,
        payload: {
          groupSearchTodoList: [
            {
              id: 1,
              posted_date: '2020-09-25T10:54:46Z',
              updated_date: '2020-09-25T10:54:46Z',
              implementation_date: '2020/09/25(金)',
              due_date: '2020/09/25(金)',
              todo_content: '携帯支払い',
              complete_flag: false,
              user_id: 'furusawa',
            },
          ],
          groupSearchTodoListMessage: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await searchGroupTodoList(groupId, params)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
