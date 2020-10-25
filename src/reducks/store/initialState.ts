const initialState = {
  categories: {
    incomeList: [],
    expenseList: [],
  },
  groupCategories: {
    groupIncomeList: [],
    groupExpenseList: [],
  },
  transactions: {
    transactionsList: [],
  },
  groupTransactions: {
    groupTransactionsList: [],
  },
  budgets: {
    standard_budgets_list: [],
    yearly_budgets_list: {
      year: '',
      yearly_total_budget: 0,
      monthly_budgets: [],
    },
    custom_budgets_list: [],
  },
  groupBudgets: {
    groupStandardBudgetsList: [],
    groupCustomBudgetsList: [],
    groupYearlyBudgetsList: {
      year: '',
      yearly_total_budget: 0,
      monthly_budgets: [],
    },
  },
  users: {
    user_id: '',
    user_name: '',
    email: '',
  },
  groups: {
    approvedGroups: [],
    unapprovedGroups: [],
    message: '',
  },
  groupTasks: {
    groupTasksListForEachUser: [],
    groupTasksList: [],
  },
  todoLists: {
    implementationTodoLists: [],
    dueTodoLists: [],
    monthImplementationTodoList: [],
    monthDueTodoList: [],
    message: '',
  },
  groupTodoLists: {
    groupImplementationTodoLists: [],
    groupDueTodoLists: [],
    message: '',
  },
  modal: {
    message: '',
    open: false,
  },
};
export default initialState;
