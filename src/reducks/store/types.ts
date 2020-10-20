import { Categories } from '../categories/types';
import { GroupCategories } from '../groupCategories/types';
import { Groups } from '../groups/types';
import { TransactionsList } from '../transactions/types';
import { StandardBudgetsList, YearlyBudgetsList, CustomBudgetsList } from '../budgets/types';
import { GroupStandardBudgetsList } from '../groupBudgets/types';
import { TodoLists } from '../todoLists/types';
import { GroupTodoLists } from '../groupTodoLists/types';
import { GroupTaskList, UserTaskList } from '../groupTasks/types';

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
    transactionsList: TransactionsList;
  };
  budgets: {
    standard_budgets_list: StandardBudgetsList;
    yearly_budgets_list: YearlyBudgetsList;
    custom_budgets_list: CustomBudgetsList;
  };
  groupBudgets: {
    groupStandardBudgetsList: GroupStandardBudgetsList;
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
    groupTasksListForEachUser: UserTaskList;
    groupTasksList: GroupTaskList;
  };
  todoLists: {
    implementationTodoLists: TodoLists;
    dueTodoLists: TodoLists;
    message: string;
  };
  groupTodoLists: {
    groupImplementationTodoLists: GroupTodoLists;
    groupDueTodoLists: GroupTodoLists;
    message: string;
  };
  modal: {
    message: string;
    open: boolean;
  };
}
