import {
  GroupRegularShoppingList,
  GroupRegularShoppingListItem,
  GroupShoppingList,
  GroupShoppingListByCategories,
  GroupShoppingListItem,
} from './types';
import { date } from '../../lib/constant';
export type GroupShoppingListActions = ReturnType<
  | typeof startFetchGroupExpiredShoppingListAction
  | typeof fetchGroupExpiredShoppingListAction
  | typeof cancelFetchGroupExpiredShoppingListAction
  | typeof failedFetchGroupExpiredShoppingListAction
  | typeof startFetchGroupTodayShoppingListAction
  | typeof fetchGroupTodayShoppingListAction
  | typeof cancelFetchGroupTodayShoppingListAction
  | typeof failedFetchGroupTodayShoppingListAction
  | typeof startFetchGroupTodayShoppingListByCategoriesAction
  | typeof fetchGroupTodayShoppingListByCategoriesAction
  | typeof cancelFetchGroupTodayShoppingListByCategoriesAction
  | typeof failedFetchGroupTodayShoppingListByCategoriesAction
  | typeof startFetchGroupMonthlyShoppingListAction
  | typeof fetchGroupMonthlyShoppingListAction
  | typeof cancelFetchGroupMonthlyShoppingListAction
  | typeof failedFetchGroupMonthlyShoppingListAction
  | typeof startFetchGroupMonthlyShoppingListByCategoriesAction
  | typeof fetchGroupMonthlyShoppingListByCategoriesAction
  | typeof cancelFetchGroupMonthlyShoppingListByCategoriesAction
  | typeof failedFetchGroupMonthlyShoppingListByCategoriesAction
  | typeof startAddGroupShoppingListItemAction
  | typeof addGroupShoppingListItemAction
  | typeof failedAddGroupShoppingListItemAction
  | typeof startEditGroupShoppingListItemAction
  | typeof editGroupShoppingListItemAction
  | typeof failedEditGroupShoppingListItemAction
  | typeof startDeleteGroupShoppingListItemAction
  | typeof deleteGroupShoppingListItemAction
  | typeof failedDeleteGroupShoppingListItemAction
  | typeof startAddGroupRegularShoppingListItemAction
  | typeof addGroupRegularShoppingListItemAction
  | typeof failedAddGroupRegularShoppingListItemAction
  | typeof startEditGroupRegularShoppingListItemAction
  | typeof editGroupRegularShoppingListItemAction
  | typeof failedEditGroupRegularShoppingListItemAction
  | typeof startDeleteGroupRegularShoppingListItemAction
  | typeof deleteGroupRegularShoppingListItemAction
  | typeof failedDeleteGroupRegularShoppingListItemAction
>;

export const START_FETCH_GROUP_EXPIRED_SHOPPING_LIST = 'START_FETCH_GROUP_EXPIRED_SHOPPING_LIST';
export const startFetchGroupExpiredShoppingListAction = () => {
  return {
    type: START_FETCH_GROUP_EXPIRED_SHOPPING_LIST,
    payload: {
      groupExpiredShoppingListLoading: true,
    },
  };
};

export const FETCH_GROUP_EXPIRED_SHOPPING_LIST = 'FETCH_GROUP_EXPIRED_SHOPPING_LIST';
export const fetchGroupExpiredShoppingListAction = (
  groupExpiredShoppingList: GroupShoppingList
) => {
  return {
    type: FETCH_GROUP_EXPIRED_SHOPPING_LIST,
    payload: {
      groupExpiredShoppingListLoading: false,
      groupExpiredShoppingList: groupExpiredShoppingList,
    },
  };
};

export const CANCEL_FETCH_GROUP_EXPIRED_SHOPPING_LIST = 'CANCEL_FETCH_GROUP_EXPIRED_SHOPPING_LIST';
export const cancelFetchGroupExpiredShoppingListAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_EXPIRED_SHOPPING_LIST,
    payload: {
      groupExpiredShoppingListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_EXPIRED_SHOPPING_LIST = 'FAILED_FETCH_GROUP_EXPIRED_SHOPPING_LIST';
export const failedFetchGroupExpiredShoppingListAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_GROUP_EXPIRED_SHOPPING_LIST,
    payload: {
      groupExpiredShoppingListLoading: false,
      groupExpiredShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_TODAY_SHOPPING_LIST = 'START_FETCH_GROUP_TODAY_SHOPPING_LIST';
export const startFetchGroupTodayShoppingListAction = () => {
  return {
    type: START_FETCH_GROUP_TODAY_SHOPPING_LIST,
    payload: {
      groupRegularShoppingListLoading: true,
      groupTodayShoppingListLoading: true,
    },
  };
};

export const FETCH_GROUP_TODAY_SHOPPING_LIST = 'FETCH_GROUP_TODAY_SHOPPING_LIST';
export const fetchGroupTodayShoppingListAction = (
  groupRegularShoppingList: GroupRegularShoppingList,
  groupTodayShoppingList: GroupShoppingList
) => {
  return {
    type: FETCH_GROUP_TODAY_SHOPPING_LIST,
    payload: {
      groupRegularShoppingListLoading: false,
      groupRegularShoppingList: groupRegularShoppingList,
      groupTodayShoppingListLoading: false,
      groupTodayShoppingList: groupTodayShoppingList,
    },
  };
};

export const CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST = 'CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST';
export const cancelFetchGroupTodayShoppingListAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST,
    payload: {
      groupRegularShoppingListLoading: false,
      groupTodayShoppingListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST = 'FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST';
export const failedFetchGroupTodayShoppingListAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST,
    payload: {
      groupRegularShoppingListLoading: false,
      groupTodayShoppingListLoading: false,
      groupTodayShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES =
  'START_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const startFetchGroupTodayShoppingListByCategoriesAction = () => {
  return {
    type: START_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      groupRegularShoppingListLoading: true,
      groupTodayShoppingListByCategoriesLoading: true,
    },
  };
};

export const FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES =
  'FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const fetchGroupTodayShoppingListByCategoriesAction = (
  groupRegularShoppingList: GroupRegularShoppingList,
  groupTodayShoppingListByCategories: GroupShoppingListByCategories
) => {
  return {
    type: FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      groupRegularShoppingListLoading: false,
      groupRegularShoppingList: groupRegularShoppingList,
      groupTodayShoppingListByCategoriesLoading: false,
      groupTodayShoppingListByCategories: groupTodayShoppingListByCategories,
    },
  };
};

export const CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES =
  'CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const cancelFetchGroupTodayShoppingListByCategoriesAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      groupRegularShoppingListLoading: false,
      groupTodayShoppingListByCategoriesLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES =
  'FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const failedFetchGroupTodayShoppingListByCategoriesAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      groupRegularShoppingListLoading: false,
      groupTodayShoppingListByCategoriesLoading: false,
      groupTodayShoppingListByCategoriesError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_MONTHLY_SHOPPING_LIST = 'START_FETCH_GROUP_MONTHLY_SHOPPING_LIST';
export const startFetchGroupMonthlyShoppingListAction = () => {
  return {
    type: START_FETCH_GROUP_MONTHLY_SHOPPING_LIST,
    payload: {
      groupRegularShoppingListLoading: true,
      groupMonthlyShoppingListLoading: true,
    },
  };
};

export const FETCH_GROUP_MONTHLY_SHOPPING_LIST = 'FETCH_GROUP_MONTHLY_SHOPPING_LIST';
export const fetchGroupMonthlyShoppingListAction = (
  groupRegularShoppingList: GroupRegularShoppingList,
  groupMonthlyShoppingList: GroupShoppingList
) => {
  return {
    type: FETCH_GROUP_MONTHLY_SHOPPING_LIST,
    payload: {
      groupRegularShoppingListLoading: false,
      groupRegularShoppingList: groupRegularShoppingList,
      groupMonthlyShoppingListLoading: false,
      groupMonthlyShoppingList: groupMonthlyShoppingList,
    },
  };
};

export const CANCEL_FETCH_GROUP_MONTHLY_SHOPPING_LIST = 'CANCEL_FETCH_GROUP_MONTHLY_SHOPPING_LIST';
export const cancelFetchGroupMonthlyShoppingListAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_MONTHLY_SHOPPING_LIST,
    payload: {
      groupRegularShoppingListLoading: false,
      groupMonthlyShoppingListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_MONTHLY_SHOPPING_LIST = 'FAILED_FETCH_GROUP_MONTHLY_SHOPPING_LIST';
export const failedFetchGroupMonthlyShoppingListAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_GROUP_MONTHLY_SHOPPING_LIST,
    payload: {
      groupRegularShoppingListLoading: false,
      groupMonthlyShoppingListLoading: false,
      groupMonthlyShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES =
  'START_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES';
export const startFetchGroupMonthlyShoppingListByCategoriesAction = () => {
  return {
    type: START_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      groupRegularShoppingListLoading: true,
      groupMonthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES =
  'FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES';
export const fetchGroupMonthlyShoppingListByCategoriesAction = (
  groupRegularShoppingList: GroupRegularShoppingList,
  groupMonthlyShoppingListByCategories: GroupShoppingListByCategories
) => {
  return {
    type: FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      groupRegularShoppingListLoading: false,
      groupRegularShoppingList: groupRegularShoppingList,
      groupMonthlyShoppingListByCategoriesLoading: false,
      groupMonthlyShoppingListByCategories: groupMonthlyShoppingListByCategories,
    },
  };
};

export const CANCEL_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES =
  'CANCEL_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES';
export const cancelFetchGroupMonthlyShoppingListByCategoriesAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      groupRegularShoppingListLoading: false,
      groupMonthlyShoppingListByCategoriesLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES =
  'FAILED_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES';
export const failedFetchGroupMonthlyShoppingListByCategoriesAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      groupRegularShoppingListLoading: false,
      groupMonthlyShoppingListByCategoriesLoading: false,
      groupMonthlyShoppingListByCategoriesError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_ADD_GROUP_SHOPPING_LIST_ITEM = 'START_ADD_GROUP_SHOPPING_LIST_ITEM';
export const startAddGroupShoppingListItemAction = () => {
  return {
    type: START_ADD_GROUP_SHOPPING_LIST_ITEM,
    payload: {
      groupTodayShoppingListLoading: true,
      groupTodayShoppingListByCategoriesLoading: true,
      groupMonthlyShoppingListLoading: true,
      groupMonthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const ADD_GROUP_SHOPPING_LIST_ITEM = 'ADD_GROUP_SHOPPING_LIST_ITEM';
export const addGroupShoppingListItemAction = (groupShoppingListItem: GroupShoppingListItem) => {
  return {
    type: ADD_GROUP_SHOPPING_LIST_ITEM,
    payload: {
      groupShoppingListItem: groupShoppingListItem,
    },
  };
};

export const FAILED_ADD_GROUP_SHOPPING_LIST_ITEM = 'FAILED_ADD_GROUP_SHOPPING_LIST_ITEM';
export const failedAddGroupShoppingListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_GROUP_SHOPPING_LIST_ITEM,
    payload: {
      groupTodayShoppingListLoading: false,
      groupTodayShoppingListByCategoriesLoading: false,
      groupMonthlyShoppingListLoading: false,
      groupMonthlyShoppingListByCategoriesLoading: false,
      groupShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_EDIT_GROUP_SHOPPING_LIST_ITEM = 'START_EDIT_GROUP_SHOPPING_LIST_ITEM';
export const startEditGroupShoppingListItemAction = () => {
  return {
    type: START_EDIT_GROUP_SHOPPING_LIST_ITEM,
    payload: {
      groupExpiredShoppingListLoading: true,
      groupTodayShoppingListLoading: true,
      groupTodayShoppingListByCategoriesLoading: true,
      groupMonthlyShoppingListLoading: true,
      groupMonthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const EDIT_GROUP_SHOPPING_LIST_ITEM = 'EDIT_GROUP_SHOPPING_LIST_ITEM';
export const editGroupShoppingListItemAction = (groupShoppingListItem: GroupShoppingListItem) => {
  return {
    type: EDIT_GROUP_SHOPPING_LIST_ITEM,
    payload: {
      groupShoppingListItem: groupShoppingListItem,
    },
  };
};

export const FAILED_EDIT_GROUP_SHOPPING_LIST_ITEM = 'FAILED_EDIT_GROUP_SHOPPING_LIST_ITEM';
export const failedEditGroupShoppingListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_GROUP_SHOPPING_LIST_ITEM,
    payload: {
      groupExpiredShoppingListLoading: false,
      groupTodayShoppingListLoading: false,
      groupTodayShoppingListByCategoriesLoading: false,
      groupMonthlyShoppingListLoading: false,
      groupMonthlyShoppingListByCategoriesLoading: false,
      groupShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_DELETE_GROUP_SHOPPING_LIST_ITEM = 'START_DELETE_GROUP_SHOPPING_LIST_ITEM';
export const startDeleteGroupShoppingListItemAction = () => {
  return {
    type: START_DELETE_GROUP_SHOPPING_LIST_ITEM,
    payload: {
      groupExpiredShoppingListLoading: true,
      groupTodayShoppingListLoading: true,
      groupTodayShoppingListByCategoriesLoading: true,
      groupMonthlyShoppingListLoading: true,
      groupMonthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const DELETE_GROUP_SHOPPING_LIST_ITEM = 'DELETE_GROUP_SHOPPING_LIST_ITEM';
export const deleteGroupShoppingListItemAction = () => {
  return {
    type: DELETE_GROUP_SHOPPING_LIST_ITEM,
    payload: {
      groupShoppingListItem: {
        id: 0,
        posted_date: date,
        updated_date: date,
        expected_purchase_date: '',
        complete_flag: false,
        purchase: '',
        shop: null,
        amount: null,
        big_category_id: 0,
        big_category_name: '',
        medium_category_id: null,
        medium_category_name: null,
        custom_category_id: null,
        custom_category_name: null,
        regular_shopping_list_id: null,
        payment_user_id: null,
        transaction_auto_add: false,
        related_transaction_data: null,
      },
    },
  };
};

export const FAILED_DELETE_GROUP_SHOPPING_LIST_ITEM = 'FAILED_DELETE_GROUP_SHOPPING_LIST_ITEM';
export const failedDeleteGroupShoppingListItemAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_DELETE_GROUP_SHOPPING_LIST_ITEM,
    payload: {
      groupExpiredShoppingListLoading: false,
      groupTodayShoppingListLoading: false,
      groupTodayShoppingListByCategoriesLoading: false,
      groupMonthlyShoppingListLoading: false,
      groupMonthlyShoppingListByCategoriesLoading: false,
      groupShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_ADD_GROUP_REGULAR_SHOPPING_LIST_ITEM =
  'START_ADD_GROUP_REGULAR_SHOPPING_LIST_ITEM';
export const startAddGroupRegularShoppingListItemAction = () => {
  return {
    type: START_ADD_GROUP_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      groupRegularShoppingListLoading: true,
      groupTodayShoppingListLoading: true,
      groupTodayShoppingListByCategoriesLoading: true,
      groupMonthlyShoppingListLoading: true,
      groupMonthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const ADD_GROUP_REGULAR_SHOPPING_LIST_ITEM = 'ADD_GROUP_REGULAR_SHOPPING_LIST_ITEM';
export const addGroupRegularShoppingListItemAction = (
  groupRegularShoppingListItem: GroupRegularShoppingListItem
) => {
  return {
    type: ADD_GROUP_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      groupRegularShoppingListItem: groupRegularShoppingListItem,
    },
  };
};

export const FAILED_ADD_GROUP_REGULAR_SHOPPING_LIST_ITEM =
  'FAILED_ADD_GROUP_REGULAR_SHOPPING_LIST_ITEM';
export const failedAddGroupRegularShoppingListItemAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_ADD_GROUP_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      groupRegularShoppingListLoading: false,
      groupTodayShoppingListLoading: false,
      groupTodayShoppingListByCategoriesLoading: false,
      groupMonthlyShoppingListLoading: false,
      groupMonthlyShoppingListByCategoriesLoading: false,
      groupShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_EDIT_GROUP_REGULAR_SHOPPING_LIST_ITEM =
  'START_EDIT_GROUP_REGULAR_SHOPPING_LIST_ITEM';
export const startEditGroupRegularShoppingListItemAction = () => {
  return {
    type: START_EDIT_GROUP_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      groupRegularShoppingListLoading: true,
      groupExpiredShoppingListLoading: true,
      groupTodayShoppingListLoading: true,
      groupTodayShoppingListByCategoriesLoading: true,
      groupMonthlyShoppingListLoading: true,
      groupMonthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const EDIT_GROUP_REGULAR_SHOPPING_LIST_ITEM = 'EDIT_GROUP_REGULAR_SHOPPING_LIST_ITEM';
export const editGroupRegularShoppingListItemAction = (
  groupRegularShoppingListItem: GroupRegularShoppingListItem
) => {
  return {
    type: EDIT_GROUP_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      groupRegularShoppingListItem: groupRegularShoppingListItem,
    },
  };
};

export const FAILED_EDIT_GROUP_REGULAR_SHOPPING_LIST_ITEM =
  'FAILED_EDIT_GROUP_REGULAR_SHOPPING_LIST_ITEM';
export const failedEditGroupRegularShoppingListItemAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_EDIT_GROUP_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      groupRegularShoppingListLoading: false,
      groupExpiredShoppingListLoading: false,
      groupTodayShoppingListLoading: false,
      groupTodayShoppingListByCategoriesLoading: false,
      groupMonthlyShoppingListLoading: false,
      groupMonthlyShoppingListByCategoriesLoading: false,
      groupShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_DELETE_GROUP_REGULAR_SHOPPING_LIST_ITEM =
  'START_DELETE_GROUP_REGULAR_SHOPPING_LIST_ITEM';
export const startDeleteGroupRegularShoppingListItemAction = () => {
  return {
    type: START_DELETE_GROUP_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      groupRegularShoppingListLoading: true,
      groupExpiredShoppingListLoading: true,
      groupTodayShoppingListLoading: true,
      groupTodayShoppingListByCategoriesLoading: true,
      groupMonthlyShoppingListLoading: true,
      groupMonthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const DELETE_GROUP_REGULAR_SHOPPING_LIST_ITEM = 'DELETE_GROUP_REGULAR_SHOPPING_LIST_ITEM';
export const deleteGroupRegularShoppingListItemAction = () => {
  return {
    type: DELETE_GROUP_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      groupRegularShoppingListItem: {
        id: 0,
        posted_date: date,
        updated_date: date,
        expected_purchase_date: '',
        cycle_type: '',
        cycle: null,
        purchase: '',
        shop: null,
        amount: null,
        big_category_id: 0,
        big_category_name: '',
        medium_category_id: null,
        medium_category_name: null,
        custom_category_id: null,
        custom_category_name: null,
        payment_user_id: null,
        transaction_auto_add: false,
      },
    },
  };
};

export const FAILED_DELETE_GROUP_REGULAR_SHOPPING_LIST_ITEM =
  'FAILED_DELETE_GROUP_REGULAR_SHOPPING_LIST_ITEM';
export const failedDeleteGroupRegularShoppingListItemAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_DELETE_GROUP_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      groupRegularShoppingListLoading: false,
      groupExpiredShoppingListLoading: false,
      groupTodayShoppingListLoading: false,
      groupTodayShoppingListByCategoriesLoading: false,
      groupMonthlyShoppingListLoading: false,
      groupMonthlyShoppingListByCategoriesLoading: false,
      groupShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};
