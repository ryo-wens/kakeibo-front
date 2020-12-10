const initialState = {
  users: {
    id: '',
    name: '',
    email: '',
    errorMessage: '',
    conflictMessage: {
      id: '',
      email: '',
    },
  },
  groups: {
    approvedGroups: [],
    unapprovedGroups: [],
    message: '',
  },
  categories: {
    incomeList: [],
    expenseList: [],
  },
  groupCategories: {
    groupIncomeList: [],
    groupExpenseList: [],
  },
  transactions: {
    latestTransactionsList: [],
    transactionsList: [],
    searchTransactionsList: [],
    noTransactionsMessage: '',
    notHistoryMessage: '',
  },
  groupTransactions: {
    groupLatestTransactionsList: [],
    groupTransactionsList: [],
    groupSearchTransactionsList: [],
    notAccountMessage: '',
    notHistoryMessage: '',
    deletedMessage: '',
    groupAccountList: {
      group_id: 0,
      month: '',
      group_total_payment_amount: 0,
      group_average_payment_amount: 0,
      group_remaining_amount: 0,
      group_accounts_list: [],
    },
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
  groupTasks: {
    groupTasksListForEachUser: [],
    groupTasksList: [],
  },

  todoList: {
    expiredTodoList: [],
    todayImplementationTodoList: [],
    todayDueTodoList: [],
    todayTodoListMessage: '',
    monthImplementationTodoList: [],
    monthDueTodoList: [],
    monthTodoListMessage: '',
    searchTodoList: [],
    searchTodoListMessage: '',
  },
  groupTodoList: {
    groupExpiredTodoList: [],
    groupTodayImplementationTodoList: [],
    groupTodayDueTodoList: [],
    groupTodayTodoListMessage: '',
    groupMonthImplementationTodoList: [],
    groupMonthDueTodoList: [],
    groupMonthTodoListMessage: '',
  },
  modal: {
    message: '',
    open: false,
  },
};
export default initialState;
