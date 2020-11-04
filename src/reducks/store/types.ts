import { Categories } from '../categories/types';
import { GroupCategories } from '../groupCategories/types';
import { Groups } from '../groups/types';
import { TransactionsList } from '../transactions/types';
import { GroupTransactionsList } from '../groupTransactions/types';
import { StandardBudgetsList, YearlyBudgetsList, CustomBudgetsList } from '../budgets/types';
import {
  GroupStandardBudgetsList,
  GroupYearlyBudgetsList,
  GroupCustomBudgetsList,
} from '../groupBudgets/types';
import { TodoList } from '../todoLists/types';
import { GroupTodoList } from '../groupTodoList/types';
import { GroupTasksList, GroupTasksListForEachUser } from '../groupTasks/types';

export interface State {
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
    noTransactionsMessage: string;
  };
  groupTransactions: {
    groupTransactionsList: GroupTransactionsList;
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
  users: {
    user_id: string;
    user_name: string;
    email: string;
  };
  groups: {
    approvedGroups: Groups;
    unapprovedGroups: Groups;
    message: string;
  };
  groupTasks: {
    groupTasksListForEachUser: GroupTasksListForEachUser;
    groupTasksList: GroupTasksList;
  };
  todoList: {
    todayImplementationTodoList: TodoList;
    todayDueTodoList: TodoList;
    todayTodoListMessage: string;
    monthImplementationTodoList: TodoList;
    monthDueTodoList: TodoList;
    monthTodoListMessage: string;
  };
  groupTodoList: {
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
