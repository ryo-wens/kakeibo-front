import * as actionTypes from '../../src/reducks/groupBudgets/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  fetchGroupStandardBudgets,
  editGroupStandardBudgets,
  fetchGroupYearlyBudgets,
  addGroupCustomBudgets,
  fetchGroupCustomBudgets,
  editGroupCustomBudgets,
  deleteGroupCustomBudgets,
} from '../../src/reducks/groupBudgets/operations';
import groupStandardBudgets from './fetchGroupStandardBudgetsResponse.json';
import groupEditedStandardBudgets from './editGroupStandardBudgetsResponse.json';
import groupYearlyBudgets from './fetchGroupYearlyBudgetsResponse.json';
import groupAddedCustomBudgets from './addGroupCustomBudgetsResponse.json';
import addGroupCustomBudgetPayload from './addGroupCustomBudgetsPayload.json';
import groupCustomBudgets from './fetchGroupCustomBudgetsResponse.json';
import editGroupCustomBudgetPayload from './editGroupCustomBudgetsPayload.json';
import groupEditedCustomBudgets from './editGroupCustomBudgetsResponse.json';
import groupDeletedCustomBudgets from './deleteGroupCustomBudgetsResponse.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions groupBudgets', () => {
  it('Get groupStandardBudgetsList if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const store = mockStore({ groupBudgets: { groupStandardBudgetsList: [] } });
    const groupId = 1;
    const signal = axios.CancelToken.source();
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/standard-budgets`;
    const fetchedGroupStandardBudgetsList = groupStandardBudgets;

    const expectedActions = [
      {
        type: actionTypes.START_FETCH_GROUP_STANDARD_BUDGETS,
        payload: {
          groupStandardBudgetsLoading: true,

          groupStandardBudgetsError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.FETCH_GROUP_STANDARD_BUDGETS,
        payload: {
          groupStandardBudgetsLoading: false,
          groupStandardBudgetsList: fetchedGroupStandardBudgetsList.standard_budgets,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchedGroupStandardBudgetsList);

    await fetchGroupStandardBudgets(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Edit groupStandard_budgets if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });
    const store = mockStore({ groupStandardBudgets });

    const groupId = 1;
    const signal = axios.CancelToken.source();
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/standard-budgets`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/standard-budgets`;

    const mockRequest = {
      standard_budgets: [
        {
          big_category_id: 2,
          budget: 25000,
        },
        {
          big_category_id: 3,
          budget: 5000,
        },
        {
          big_category_id: 4,
          budget: 4500,
        },
        {
          big_category_id: 5,
          budget: 1000,
        },
        {
          big_category_id: 6,
          budget: 5000,
        },
        {
          big_category_id: 7,
          budget: 0,
        },
        {
          big_category_id: 8,
          budget: 5000,
        },
        {
          big_category_id: 9,
          budget: 10000,
        },
        {
          big_category_id: 10,
          budget: 10000,
        },
        {
          big_category_id: 11,
          budget: 60000,
        },
        {
          big_category_id: 12,
          budget: 8000,
        },
        {
          big_category_id: 13,
          budget: 0,
        },
        {
          big_category_id: 14,
          budget: 10000,
        },
        {
          big_category_id: 15,
          budget: 0,
        },
        {
          big_category_id: 16,
          budget: 0,
        },
        {
          big_category_id: 17,
          budget: 0,
        },
      ],
    };
    const editedGroupStandardBudgetsList = groupEditedStandardBudgets;

    const expectedActions = [
      {
        type: actionTypes.START_EDIT_GROUP_STANDARD_BUDGETS,
        payload: {
          groupStandardBudgetsLoading: true,

          groupStandardBudgetsError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.EDIT_GROUP_STANDARD_BUDGETS,
        payload: {
          groupStandardBudgetsLoading: false,
          groupStandardBudgetsList: groupEditedStandardBudgets.standard_budgets,
        },
      },
    ];

    axiosMock.onPut(editUrl, mockRequest).reply(200, editedGroupStandardBudgetsList);
    axiosMock.onGet(fetchUrl).reply(200, editedGroupStandardBudgetsList);

    await editGroupStandardBudgets(groupId, signal, mockRequest.standard_budgets)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Get groupYearlyBudgets if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });
    const store = mockStore({ groupBudgets: { groupYearlyBudgetsList: [] } });

    const date = new Date();
    const year = date.getFullYear();

    const groupId = 1;
    const signal = axios.CancelToken.source();
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/budgets/${year}`;

    const fetchedGroupYearlyBudgetsList = groupYearlyBudgets;

    const expectedActions = [
      {
        type: actionTypes.START_FETCH_GROUP_YEARLY_BUDGETS,
        payload: {
          groupYearlyBudgetsLoading: true,

          groupYearlyBudgetsError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.FETCH_GROUP_YEARLY_BUDGETS,
        payload: {
          groupYearlyBudgetsLoading: false,
          groupYearlyBudgetsList: fetchedGroupYearlyBudgetsList,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchedGroupYearlyBudgetsList);

    await fetchGroupYearlyBudgets(groupId, year, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Get groupCustomBudgets if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const selectYear = '2020';
    const selectMonth = '01';
    const store = mockStore({ groupBudgets: { groupCustomBudgetsList: [] } });

    const groupId = 1;
    const signal = axios.CancelToken.source();
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`;

    const fetchedGroupCustomBudgesList = groupCustomBudgets;

    const expectedActions = [
      {
        type: actionTypes.START_FETCH_GROUP_CUSTOM_BUDGETS,
        payload: {
          groupCustomBudgetsLoading: true,

          groupCustomBudgetsError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.FETCH_GROUP_CUSTOM_BUDGETS,
        payload: {
          groupCustomBudgetsLoading: false,
          groupCustomBudgetsList: fetchedGroupCustomBudgesList.custom_budgets,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchedGroupCustomBudgesList);

    await fetchGroupCustomBudgets(selectYear, selectMonth, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Add groupCustomBudgets if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const groupId = 1;
    const selectYear = '2020';
    const selectMonth = '02';
    const signal = axios.CancelToken.source();
    const store = mockStore({ groupBudgets: { groupYearlyBudgetsList: groupYearlyBudgets } });
    const addUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`;
    const fetchCustomUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`;
    const fetchYearlyUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/budgets/${selectYear}`;

    const addedGroupCustomBudgetsList = groupAddedCustomBudgets;

    const mockRequest = {
      custom_budgets: [
        {
          big_category_id: 2,
          budget: 25000,
        },
        {
          big_category_id: 3,
          budget: 5000,
        },
        {
          big_category_id: 4,
          budget: 5000,
        },
        {
          big_category_id: 5,
          budget: 1000,
        },
        {
          big_category_id: 6,
          budget: 1000,
        },
        {
          big_category_id: 7,
          budget: 0,
        },
        {
          big_category_id: 8,
          budget: 8000,
        },
        {
          big_category_id: 9,
          budget: 10000,
        },
        {
          big_category_id: 10,
          budget: 10000,
        },
        {
          big_category_id: 11,
          budget: 65000,
        },
        {
          big_category_id: 12,
          budget: 7000,
        },
        {
          big_category_id: 13,
          budget: 0,
        },
        {
          big_category_id: 14,
          budget: 10000,
        },
        {
          big_category_id: 15,
          budget: 0,
        },
        {
          big_category_id: 16,
          budget: 8000,
        },
        {
          big_category_id: 17,
          budget: 0,
        },
      ],
    };

    const expectedActions = [
      {
        type: actionTypes.START_ADD_GROUP_CUSTOM_BUDGETS,
        payload: {
          groupCustomBudgetsLoading: true,
          groupYearlyBudgetsLoading: true,

          groupCustomBudgetsError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.ADD_GROUP_CUSTOM_BUDGETS,
        payload: {
          groupCustomBudgetsLoading: false,
          groupCustomBudgetsList: addedGroupCustomBudgetsList.custom_budgets,
          groupYearlyBudgetsLoading: false,
          groupYearlyBudgetsList: addGroupCustomBudgetPayload,
        },
      },
    ];

    axiosMock.onPost(addUrl).reply(201, addedGroupCustomBudgetsList);
    axiosMock.onGet(fetchCustomUrl).reply(200, addedGroupCustomBudgetsList);
    axiosMock.onGet(fetchYearlyUrl).reply(200, addGroupCustomBudgetPayload);

    await addGroupCustomBudgets(
      selectYear,
      selectMonth,
      groupId,
      signal,
      mockRequest.custom_budgets
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Edit groupCustomBudgets  if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const selectYear = '2020';
    const selectMonth = '02';
    const signal = axios.CancelToken.source();
    const store = mockStore({
      groupBudgets: { groupYearlyBudgetsList: addGroupCustomBudgetPayload },
    });

    const groupId = 1;
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`;
    const fetchCustomUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`;
    const fetchYearlyUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/budgets/${selectYear}`;

    const mockRequest = {
      custom_budgets: [
        {
          big_category_id: 2,
          budget: 25000,
        },
        {
          big_category_id: 3,
          budget: 8000,
        },
        {
          big_category_id: 4,
          budget: 9000,
        },
        {
          big_category_id: 5,
          budget: 1000,
        },
        {
          big_category_id: 6,
          budget: 3000,
        },
        {
          big_category_id: 7,
          budget: 0,
        },
        {
          big_category_id: 8,
          budget: 8000,
        },
        {
          big_category_id: 9,
          budget: 10000,
        },
        {
          big_category_id: 10,
          budget: 10000,
        },
        {
          big_category_id: 11,
          budget: 65000,
        },
        {
          big_category_id: 12,
          budget: 7000,
        },
        {
          big_category_id: 13,
          budget: 0,
        },
        {
          big_category_id: 14,
          budget: 10000,
        },
        {
          big_category_id: 15,
          budget: 0,
        },
        {
          big_category_id: 16,
          budget: 8000,
        },
        {
          big_category_id: 17,
          budget: 0,
        },
      ],
    };

    const editedGroupCustomBudgets = groupEditedCustomBudgets;

    const expectedActions = [
      {
        type: actionTypes.START_EDIT_GROUP_CUSTOM_BUDGETS,
        payload: {
          groupCustomBudgetsLoading: true,
          groupYearlyBudgetsLoading: true,

          groupCustomBudgetsError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.EDIT_GROUP_CUSTOM_BUDGETS,
        payload: {
          groupCustomBudgetsLoading: false,
          groupCustomBudgetsList: editedGroupCustomBudgets.custom_budgets,
          groupYearlyBudgetsLoading: false,
          groupYearlyBudgetsList: editGroupCustomBudgetPayload,
        },
      },
    ];

    axiosMock.onPut(editUrl).reply(200, editedGroupCustomBudgets);
    axiosMock.onGet(fetchCustomUrl).reply(200, editedGroupCustomBudgets);
    axiosMock.onGet(fetchYearlyUrl).reply(200, editGroupCustomBudgetPayload);

    await editGroupCustomBudgets(
      selectYear,
      selectMonth,
      groupId,
      signal,
      mockRequest.custom_budgets
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Delete groupCustomBudgets if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const store = mockStore({
      groupBudgets: {
        groupYearlyBudgetsList: groupYearlyBudgets,
        groupStandardBudgetsList: groupEditedStandardBudgets.standard_budgets,
      },
    });

    const selectYear = '2020';
    const selectMonth = '02';
    const groupId = 1;
    const signal = axios.CancelToken.source();
    const deleteUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`;
    const fetchYearlyUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/budgets/${selectYear}`;

    const deletedGroupCustomBudgetsMessage = groupDeletedCustomBudgets.message;

    const deletedYearlyBudgetsList = {
      year: '2020-01-01T00:00:00Z',
      yearly_total_budget: 1801500,
      monthly_budgets: [
        {
          month: '2020年01月',
          budget_type: 'CustomBudget',
          monthly_total_budget: 170000,
        },
        {
          month: '2020年02月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年03月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年04月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年05月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年06月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年07月',
          budget_type: 'CustomBudget',
          monthly_total_budget: 170000,
        },
        {
          month: '2020年08月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年09月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年10月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年11月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年12月',
          budget_type: 'CustomBudget',
          monthly_total_budget: 170000,
        },
      ],
    };

    const expectedActions = [
      {
        type: actionTypes.START_DELETE_GROUP_CUSTOM_BUDGETS,
        payload: {
          groupYearlyBudgetsLoading: true,

          groupCustomBudgetsError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.DELETE_GROUP_CUSTOM_BUDGETS,
        payload: {
          groupYearlyBudgetsLoading: false,
          groupYearlyBudgetsList: deletedYearlyBudgetsList,
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, deletedGroupCustomBudgetsMessage);
    axiosMock.onGet(fetchYearlyUrl).reply(200, deletedYearlyBudgetsList);

    await deleteGroupCustomBudgets(selectYear, selectMonth, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
