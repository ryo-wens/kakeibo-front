import { Categories, CategoriesError } from '../categories/types';
import { GroupCategories } from '../groupCategories/types';
import { Groups } from '../groups/types';
import { TransactionsList } from '../transactions/types';
import {
  GroupTransactionsList,
  GroupAccountList,
  GroupYearlyAccountList,
} from '../groupTransactions/types';
import { StandardBudgetsList, YearlyBudgetsList, CustomBudgetsList } from '../budgets/types';
import {
  GroupStandardBudgetsList,
  GroupYearlyBudgetsList,
  GroupCustomBudgetsList,
} from '../groupBudgets/types';
import { TodoList } from '../todoList/types';
import { GroupTodoList } from '../groupTodoList/types';
import { GroupTasksList, GroupTasksListForEachUser } from '../groupTasks/types';
import { RegularShoppingList, ShoppingList, ShoppingListByCategories } from '../shoppingList/types';
import {
  GroupRegularShoppingList,
  GroupShoppingList,
  GroupShoppingListByCategories,
} from '../groupShoppingList/types';

export interface State {
  users: {
    id: string;
    name: string;
    email: string;
    errorMessage: string;
    conflictMessage: {
      id: string;
      email: string;
    };
  };
  groups: {
    approvedGroups: Groups;
    unapprovedGroups: Groups;
    message: string;
  };
  categories: {
    incomeList: Categories;
    expenseList: Categories;
    categoriesError: CategoriesError;
  };
  groupCategories: {
    groupIncomeList: GroupCategories;
    groupExpenseList: GroupCategories;
  };
  transactions: {
    latestTransactionsList: TransactionsList;
    transactionsList: TransactionsList;
    searchTransactionsList: TransactionsList;
    noTransactionsMessage: string;
    notHistoryMessage: string;
  };
  groupTransactions: {
    groupLatestTransactionsList: GroupTransactionsList;
    groupLatestTransactionsListLoading: boolean;
    groupLatestTransactionsListError: {
      statusCode: number;
      errorMessage: string;
    };
    groupTransactionsList: GroupTransactionsList;
    groupTransactionsListLoading: boolean;
    groupTransactionsListError: {
      statusCode: number;
      errorMessage: string;
    };
    groupSearchTransactionsList: GroupTransactionsList;
    groupSearchTransactionsListLoading: boolean;
    groupSearchTransactionsListError: {
      statusCode: number;
      errorMessage: string;
    };
    groupAccountList: GroupAccountList;
    groupAccountListLoading: boolean;
    groupAccountListError: {
      statusCode: number;
      errorMessage: string;
    };
    groupYearlyAccountList: GroupYearlyAccountList;
    groupYearlyAccountListLoading: boolean;
    groupYearlyAccountListError: {
      statusCode: number;
      errorMessage: string;
    };
    groupYearlyAccountListForModal: GroupYearlyAccountList;
    groupYearlyAccountListForModalLoading: boolean;
    groupYearlyAccountListForModalError: {
      statusCode: number;
      errorMessage: string;
    };
    notAccountMessage: string;
    deletedMessage: string;
  };
  budgets: {
    standard_budgets_list: StandardBudgetsList;
    standardBudgetsLoading: boolean;
    standardBudgetsError: {
      statusCode: number;
      errorMessage: string;
    };
    yearly_budgets_list: YearlyBudgetsList;
    yearlyBudgetsLoading: boolean;
    yearlyBudgetsError: {
      statusCode: number;
      errorMessage: string;
    };
    custom_budgets_list: CustomBudgetsList;
    customBudgetsLoading: boolean;
    customBudgetsError: {
      statusCode: number;
      errorMessage: string;
    };
  };
  groupBudgets: {
    groupStandardBudgetsList: GroupStandardBudgetsList;
    groupStandardBudgetsLoading: boolean;
    groupStandardBudgetsError: {
      statusCode: number;
      errorMessage: string;
    };
    groupCustomBudgetsList: GroupCustomBudgetsList;
    groupCustomBudgetsLoading: boolean;
    groupCustomBudgetsError: {
      statusCode: number;
      errorMessage: string;
    };
    groupYearlyBudgetsList: GroupYearlyBudgetsList;
    groupYearlyBudgetsLoading: boolean;
    groupYearlyBudgetsError: {
      statusCode: number;
      errorMessage: string;
    };
  };
  groupTasks: {
    groupTasksListForEachUser: GroupTasksListForEachUser;
    groupTasksList: GroupTasksList;
  };
  shoppingList: {
    regularShoppingList: RegularShoppingList;
    regularShoppingListLoading: boolean;
    regularShoppingListError: {
      message: string;
      statusCode: number;
    };
    expiredShoppingList: ShoppingList;
    expiredShoppingListLoading: boolean;
    expiredShoppingListError: {
      message: string;
      statusCode: number;
    };
    todayShoppingList: ShoppingList;
    todayShoppingListLoading: boolean;
    todayShoppingListError: {
      message: string;
      statusCode: number;
    };
    todayShoppingListByCategories: ShoppingListByCategories;
    todayShoppingListByCategoriesLoading: boolean;
    todayShoppingListByCategoriesError: {
      message: string;
      statusCode: number;
    };
    monthlyShoppingList: ShoppingList;
    monthlyShoppingListLoading: boolean;
    monthlyShoppingListError: {
      message: string;
      statusCode: number;
    };
    monthlyShoppingListByCategories: ShoppingListByCategories;
    monthlyShoppingListByCategoriesLoading: boolean;
    monthlyShoppingListByCategoriesError: {
      message: string;
      statusCode: number;
    };
  };
  groupShoppingList: {
    groupRegularShoppingList: GroupRegularShoppingList;
    groupRegularShoppingListLoading: boolean;
    groupRegularShoppingListError: {
      message: string;
      statusCode: number;
    };
    groupExpiredShoppingList: GroupShoppingList;
    groupExpiredShoppingListLoading: boolean;
    groupExpiredShoppingListError: {
      message: string;
      statusCode: number;
    };
    groupTodayShoppingList: GroupShoppingList;
    groupTodayShoppingListLoading: boolean;
    groupTodayShoppingListError: {
      message: string;
      statusCode: number;
    };
    groupTodayShoppingListByCategories: GroupShoppingListByCategories;
    groupTodayShoppingListByCategoriesLoading: boolean;
    groupTodayShoppingListByCategoriesError: {
      message: string;
      statusCode: number;
    };
    groupMonthlyShoppingList: GroupShoppingList;
    groupMonthlyShoppingListLoading: boolean;
    groupMonthlyShoppingListError: {
      message: string;
      statusCode: number;
    };
    groupMonthlyShoppingListByCategories: GroupShoppingListByCategories;
    groupMonthlyShoppingListByCategoriesLoading: boolean;
    groupMonthlyShoppingListByCategoriesError: {
      message: string;
      statusCode: number;
    };
  };
  todoList: {
    expiredTodoList: TodoList;
    expiredTodoListLoading: boolean;
    expiredTodoListError: {
      message: string;
      statusCode: number;
    };
    todayImplementationTodoList: TodoList;
    todayDueTodoList: TodoList;
    todayTodoListLoading: boolean;
    todayTodoListError: {
      message: string;
      statusCode: number;
    };
    todayTodoListMessage: string;
    monthlyImplementationTodoList: TodoList;
    monthlyDueTodoList: TodoList;
    monthlyTodoListLoading: boolean;
    monthlyTodoListError: {
      message: string;
      statusCode: number;
    };
    monthlyTodoListMessage: string;
    searchTodoList: TodoList;
    searchTodoListLoading: boolean;
    searchTodoListError: {
      message: string;
      statusCode: number;
    };
    searchTodoListMessage: string;
    todoListError: {
      message: string;
      statusCode: number;
    };
  };
  groupTodoList: {
    groupExpiredTodoList: GroupTodoList;
    groupTodayImplementationTodoList: GroupTodoList;
    groupTodayDueTodoList: GroupTodoList;
    groupTodayTodoListMessage: string;
    groupMonthImplementationTodoList: GroupTodoList;
    groupMonthDueTodoList: GroupTodoList;
    groupMonthTodoListMessage: string;
    groupSearchTodoList: GroupTodoList;
    groupSearchTodoListMessage: string;
  };
  modal: {
    message: string;
    open: boolean;
  };
}
