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
    categoriesError: {
      statusCode: 0,
      errorMessage: '',
    },
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
    groupLatestTransactionsListLoading: false,
    groupLatestTransactionsListError: {
      statusCode: 0,
      errorMessage: '',
    },
    groupTransactionsList: [],
    groupTransactionsListLoading: false,
    groupTransactionsListError: {
      statusCode: 0,
      errorMessage: '',
    },
    groupSearchTransactionsList: [],
    groupSearchTransactionsListLoading: false,
    groupSearchTransactionsListError: {
      statusCode: 0,
      errorMessage: '',
    },
    notHistoryMessage: '',
    deletedMessage: '',
    groupAccountList: {
      group_id: 0,
      month: '',
      group_total_payment_amount: 0,
      group_average_payment_amount: 0,
      group_remaining_amount: 0,
      group_accounts_list_by_payer: [],
    },
    groupAccountListLoading: false,
    groupAccountListError: {
      statusCode: 0,
      errorMessage: '',
    },
    groupYearlyAccountList: {
      year: '',
      yearly_accounting_status: [],
    },
    groupYearlyAccountListLoading: false,
    groupYearlyAccountListError: {
      statusCode: 0,
      errorMessage: '',
    },
    groupYearlyAccountListForModal: {
      year: '',
      yearly_accounting_status: [],
    },
    groupYearlyAccountListForModalLoading: false,
    groupYearlyAccountListForModalError: {
      statusCode: 0,
      errorMessage: '',
    },
  },
  budgets: {
    standard_budgets_list: [],
    standardBudgetsLoading: false,
    standardBudgetsError: {
      statusCode: 0,
      errorMessage: '',
    },
    yearly_budgets_list: {
      year: '',
      yearly_total_budget: 0,
      monthly_budgets: [],
    },
    yearlyBudgetsLoading: false,
    yearlyBudgetsError: {
      statusCode: 0,
      errorMessage: '',
    },
    custom_budgets_list: [],
    customBudgetsLoading: false,
    customBudgetsError: {
      statusCode: 0,
      errorMessage: '',
    },
  },
  groupBudgets: {
    groupStandardBudgetsList: [],
    groupStandardBudgetsLoading: false,
    groupStandardBudgetsError: {
      statusCode: 0,
      errorMessage: '',
    },
    groupCustomBudgetsList: [],
    groupCustomBudgetsLoading: false,
    groupCustomBudgetsError: {
      statusCode: 0,
      errorMessage: '',
    },
    groupYearlyBudgetsList: {
      year: '',
      yearly_total_budget: 0,
      monthly_budgets: [],
    },
    groupYearlyBudgetsLoading: false,
    groupYearlyBudgetsError: {
      statusCode: 0,
      errorMessage: '',
    },
  },
  groupTasks: {
    groupTasksListForEachUser: [],
    groupTasksList: [],
  },
  shoppingList: {
    regularShoppingListLoading: false,
    regularShoppingList: [],
    regularShoppingListError: {
      message: '',
      statusCode: 0,
    },
    expiredShoppingListLoading: false,
    expiredShoppingList: [],
    expiredShoppingListError: {
      message: '',
      statusCode: 0,
    },
    todayShoppingListLoading: false,
    todayShoppingList: [],
    todayShoppingListError: {
      message: '',
      statusCode: 0,
    },
    todayShoppingListByCategoriesLoading: false,
    todayShoppingListByCategories: [],
    todayShoppingListByCategoriesError: {
      message: '',
      statusCode: 0,
    },
    monthlyShoppingListLoading: false,
    monthlyShoppingList: [],
    monthlyShoppingListError: {
      message: '',
      statusCode: 0,
    },
    monthlyShoppingListByCategoriesLoading: false,
    monthlyShoppingListByCategories: [],
    monthlyShoppingListByCategoriesError: {
      message: '',
      statusCode: 0,
    },
  },
  groupShoppingList: {
    groupRegularShoppingListLoading: false,
    groupRegularShoppingList: [],
    groupRegularShoppingListError: {
      message: '',
      statusCode: 0,
    },
    groupExpiredShoppingListLoading: false,
    groupExpiredShoppingList: [],
    groupExpiredShoppingListError: {
      message: '',
      statusCode: 0,
    },
    groupTodayShoppingListLoading: false,
    groupTodayShoppingList: [],
    groupTodayShoppingListError: {
      message: '',
      statusCode: 0,
    },
    groupTodayShoppingListByCategoriesLoading: false,
    groupTodayShoppingListByCategories: [],
    groupTodayShoppingListByCategoriesError: {
      message: '',
      statusCode: 0,
    },
    groupMonthlyShoppingListLoading: false,
    groupMonthlyShoppingList: [],
    groupMonthlyShoppingListError: {
      message: '',
      statusCode: 0,
    },
    groupMonthlyShoppingListByCategoriesLoading: false,
    groupMonthlyShoppingListByCategories: [],
    groupMonthlyShoppingListByCategoriesError: {
      message: '',
      statusCode: 0,
    },
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
    groupSearchTodoList: [],
    groupSearchTodoListMessage: '',
  },
  modal: {
    message: '',
    open: false,
  },
};
export default initialState;
