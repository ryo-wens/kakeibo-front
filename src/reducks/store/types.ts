import { Categories } from '../categories/types';
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
import { GroupTaskList, GroupTaskListForEachUser } from '../groupTasks/types';
import {
  RegularShoppingList,
  RegularShoppingListItem,
  ShoppingList,
  ShoppingListByCategories,
  ShoppingListItem,
} from '../shoppingList/types';
import {
  GroupRegularShoppingList,
  GroupShoppingList,
  GroupShoppingListByCategories,
} from '../groupShoppingList/types';

export interface State {
  users: {
    user_id: string;
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
    groupsLoading: boolean;
    group: {
      groupId: number;
      groupName: string;
    };
    groupUser: {
      groupId: number;
      userId: string;
      userName: string;
      colorCode: string;
    };
    groupsError: {
      statusCode: number | null;
      errorMessage: string;
    };
  };
  categories: {
    incomeList: Categories;
    expenseList: Categories;
    incomeCategoriesLoading: boolean;
    expenseCategoriesLoading: boolean;
    categoriesError: {
      statusCode: number | null;
      errorMessage: string;
    };
  };
  groupCategories: {
    groupIncomeList: GroupCategories;
    groupExpenseList: GroupCategories;
    groupIncomeCategoriesLoading: boolean;
    groupExpenseCategoriesLoading: boolean;
    groupCategoriesError: {
      statusCode: number | null;
      errorMessage: string;
    };
  };
  transactions: {
    latestTransactionsList: TransactionsList;
    latestTransactionsListLoading: boolean;
    latestTransactionsListError: {
      statusCode: number | null;
      errorMessage: string;
    };
    transactionsList: TransactionsList;
    transactionsListLoading: boolean;
    transactionsListError: {
      statusCode: number | null;
      errorMessage: string;
    };
    searchTransactionsList: TransactionsList;
    searchTransactionsListLoading: boolean;
    searchTransactionsListError: {
      statusCode: number | null;
      errorMessage: string;
    };
    noTransactionsMessage: string;
    notHistoryMessage: string;
  };
  groupTransactions: {
    groupLatestTransactionsList: GroupTransactionsList;
    groupLatestTransactionsListLoading: boolean;
    groupLatestTransactionsListError: {
      statusCode: number | null;
      errorMessage: string;
    };
    groupTransactionsList: GroupTransactionsList;
    groupTransactionsListLoading: boolean;
    groupTransactionsListError: {
      statusCode: number | null;
      errorMessage: string;
    };
    groupSearchTransactionsList: GroupTransactionsList;
    groupSearchTransactionsListLoading: boolean;
    groupSearchTransactionsListError: {
      statusCode: number | null;
      errorMessage: string;
    };
    groupAccountList: GroupAccountList;
    groupAccountListLoading: boolean;
    groupAccountListError: {
      statusCode: number | null;
      errorMessage: string;
    };
    groupYearlyAccountList: GroupYearlyAccountList;
    groupYearlyAccountListLoading: boolean;
    groupYearlyAccountListError: {
      statusCode: number | null;
      errorMessage: string;
    };
    groupYearlyAccountListForModal: GroupYearlyAccountList;
    groupYearlyAccountListForModalLoading: boolean;
    groupYearlyAccountListForModalError: {
      statusCode: number | null;
      errorMessage: string;
    };
    notAccountMessage: string;
    deletedMessage: string;
  };
  budgets: {
    standard_budgets_list: StandardBudgetsList;
    standardBudgetsLoading: boolean;
    standardBudgetsError: {
      statusCode: number | null;
      errorMessage: string;
    };
    yearly_budgets_list: YearlyBudgetsList;
    yearlyBudgetsLoading: boolean;
    yearlyBudgetsError: {
      statusCode: number | null;
      errorMessage: string;
    };
    custom_budgets_list: CustomBudgetsList;
    customBudgetsLoading: boolean;
    customBudgetsError: {
      statusCode: number | null;
      errorMessage: string;
    };
  };
  groupBudgets: {
    groupStandardBudgetsList: GroupStandardBudgetsList;
    groupStandardBudgetsLoading: boolean;
    groupStandardBudgetsError: {
      statusCode: number | null;
      errorMessage: string;
    };
    groupCustomBudgetsList: GroupCustomBudgetsList;
    groupCustomBudgetsLoading: boolean;
    groupCustomBudgetsError: {
      statusCode: number | null;
      errorMessage: string;
    };
    groupYearlyBudgetsList: GroupYearlyBudgetsList;
    groupYearlyBudgetsLoading: boolean;
    groupYearlyBudgetsError: {
      statusCode: number | null;
      errorMessage: string;
    };
  };
  groupTasks: {
    groupTaskListForEachUser: GroupTaskListForEachUser;
    groupTaskListForEachUserLoading: boolean;
    groupTaskListForEachUserError: {
      statusCode: number | null;
      errorMessage: string;
    };
    groupTaskList: GroupTaskList;
    groupTaskListLoading: boolean;
    groupTaskListError: {
      statusCode: number | null;
      errorMessage: string;
    };
    groupTaskError: {
      statusCode: number | null;
      errorMessage: string;
    };
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
    shoppingListItem: ShoppingListItem;
    regularShoppingListItem: RegularShoppingListItem;
    shoppingListError: {
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
    groupShoppingListError: {
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
    monthlyImplementationTodoList: TodoList;
    monthlyDueTodoList: TodoList;
    monthlyTodoListLoading: boolean;
    monthlyTodoListError: {
      message: string;
      statusCode: number;
    };
    searchTodoList: TodoList;
    searchTodoListLoading: boolean;
    searchTodoListError: {
      message: string;
      statusCode: number;
    };
    todoListItem: {
      id: number;
      posted_date: Date | null;
      updated_date: Date | null;
      implementation_date: string;
      due_date: string;
      todo_content: string;
      complete_flag: boolean;
    };
    todoListError: {
      message: string;
      statusCode: number;
    };
  };
  groupTodoList: {
    groupExpiredTodoList: GroupTodoList;
    groupExpiredTodoListLoading: boolean;
    groupExpiredTodoListError: {
      message: string;
      statusCode: number;
    };
    groupTodayImplementationTodoList: GroupTodoList;
    groupTodayDueTodoList: GroupTodoList;
    groupTodayTodoListLoading: boolean;
    groupTodayTodoListError: {
      message: string;
      statusCode: number;
    };
    groupMonthlyImplementationTodoList: GroupTodoList;
    groupMonthlyDueTodoList: GroupTodoList;
    groupMonthlyTodoListLoading: boolean;
    groupMonthlyTodoListError: {
      message: string;
      statusCode: number;
    };
    groupSearchTodoList: GroupTodoList;
    groupSearchTodoListLoading: boolean;
    groupSearchTodoListError: {
      message: string;
      statusCode: number;
    };
    groupTodoListItem: {
      id: number;
      posted_date: Date | null;
      updated_date: Date | null;
      implementation_date: string;
      due_date: string;
      todo_content: string;
      complete_flag: boolean;
      user_id: string;
    };
    groupTodoListError: {
      message: string;
      statusCode: number;
    };
  };
  modal: {
    message: string;
    open: boolean;
  };
}
