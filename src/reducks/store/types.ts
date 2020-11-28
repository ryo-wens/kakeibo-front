import { Categories } from '../categories/types';
import { GroupCategories } from '../groupCategories/types';
import { Groups } from '../groups/types';
import { TransactionsList } from '../transactions/types';
import { GroupTransactionsList, GroupAccountList } from '../groupTransactions/types';
import { StandardBudgetsList, YearlyBudgetsList, CustomBudgetsList } from '../budgets/types';
import {
  GroupStandardBudgetsList,
  GroupYearlyBudgetsList,
  GroupCustomBudgetsList,
} from '../groupBudgets/types';
import { TodoList } from '../todoList/types';
import { GroupTodoList } from '../groupTodoList/types';
import { GroupTasksList, GroupTasksListForEachUser } from '../groupTasks/types';

export interface State {
  users: {
    id: string;
    name: string;
    email: string;
    errorMessage: string;
  };
  groups: {
    approvedGroups: Groups;
    unapprovedGroups: Groups;
    message: string;
  };
  categories: {
    incomeList: Categories;
    expenseList: Categories;
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
    groupTransactionsList: GroupTransactionsList;
    groupSearchTransactionsList: GroupTransactionsList;
    groupAccountList: GroupAccountList;
    notAccountMessage: string;
    deletedMessage: string;
  };
  budgets: {
    standard_budgets_list: StandardBudgetsList;
    yearly_budgets_list: YearlyBudgetsList;
    custom_budgets_list: CustomBudgetsList;
  };
  groupBudgets: {
    groupStandardBudgetsList: GroupStandardBudgetsList;
    groupYearlyBudgetsList: GroupYearlyBudgetsList;
    groupCustomBudgetsList: GroupCustomBudgetsList;
  };
  groupTasks: {
    groupTasksListForEachUser: GroupTasksListForEachUser;
    groupTasksList: GroupTasksList;
  };
  todoList: {
    expiredTodoList: TodoList;
    todayImplementationTodoList: TodoList;
    todayDueTodoList: TodoList;
    todayTodoListMessage: string;
    monthImplementationTodoList: TodoList;
    monthDueTodoList: TodoList;
    monthTodoListMessage: string;
  };
  groupTodoList: {
    groupExpiredTodoList: GroupTodoList;
    groupTodayImplementationTodoList: GroupTodoList;
    groupTodayDueTodoList: GroupTodoList;
    groupTodayTodoListMessage: string;
    groupMonthImplementationTodoList: GroupTodoList;
    groupMonthDueTodoList: GroupTodoList;
    groupMonthTodoListMessage: string;
  };
  modal: {
    message: string;
    open: boolean;
  };
}
