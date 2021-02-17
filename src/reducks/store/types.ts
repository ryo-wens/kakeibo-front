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
    regularShoppingListLoading: boolean;
    regularShoppingList: RegularShoppingList;
    regularShoppingListError: {
      message: string;
      statusCode: number;
    };
    expiredShoppingListLoading: boolean;
    expiredShoppingList: ShoppingList;
    expiredShoppingListError: {
      message: string;
      statusCode: number;
    };
    todayShoppingListLoading: boolean;
    todayShoppingList: ShoppingList;
    todayShoppingListError: {
      message: string;
      statusCode: number;
    };
    todayShoppingListByCategoriesLoading: boolean;
    todayShoppingListByCategories: ShoppingListByCategories;
    todayShoppingListByCategoriesError: {
      message: string;
      statusCode: number;
    };
    monthlyShoppingListLoading: boolean;
    monthlyShoppingList: ShoppingList;
    monthlyShoppingListError: {
      message: string;
      statusCode: number;
    };
    monthlyShoppingListByCategoriesLoading: boolean;
    monthlyShoppingListByCategories: ShoppingListByCategories;
    monthlyShoppingListByCategoriesError: {
      message: string;
      statusCode: number;
    };
  };
  groupShoppingList: {
    groupRegularShoppingListLoading: boolean;
    groupRegularShoppingList: GroupRegularShoppingList;
    groupRegularShoppingListError: {
      message: string;
      statusCode: number;
    };
    groupExpiredShoppingListLoading: boolean;
    groupExpiredShoppingList: GroupShoppingList;
    groupExpiredShoppingListError: {
      message: string;
      statusCode: number;
    };
    groupTodayShoppingListLoading: boolean;
    groupTodayShoppingList: GroupShoppingList;
    groupTodayShoppingListError: {
      message: string;
      statusCode: number;
    };
    groupTodayShoppingListByCategoriesLoading: boolean;
    groupTodayShoppingListByCategories: GroupShoppingListByCategories;
    groupTodayShoppingListByCategoriesError: {
      message: string;
      statusCode: number;
    };
    groupMonthlyShoppingListLoading: boolean;
    groupMonthlyShoppingList: GroupShoppingList;
    groupMonthlyShoppingListError: {
      message: string;
      statusCode: number;
    };
    groupMonthlyShoppingListByCategoriesLoading: boolean;
    groupMonthlyShoppingListByCategories: GroupShoppingListByCategories;
    groupMonthlyShoppingListByCategoriesError: {
      message: string;
      statusCode: number;
    };
  };
  todoList: {
    expiredTodoList: TodoList;
    todayImplementationTodoList: TodoList;
    todayDueTodoList: TodoList;
    todayTodoListMessage: string;
    monthImplementationTodoList: TodoList;
    monthDueTodoList: TodoList;
    monthTodoListMessage: string;
    searchTodoList: TodoList;
    searchTodoListMessage: string;
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
