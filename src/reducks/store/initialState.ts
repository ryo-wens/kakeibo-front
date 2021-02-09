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
    category: {
      incomeList: [],
      expenseList: [],
      categoriesError: {
        statusCode: 0,
        errorMessage: '',
      },
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
    loading: false,
    groupLatestTransactionsList: [],
    groupTransactionsList: [],
    groupSearchTransactionsList: [],
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
    groupYearlyAccountList: {
      year: '',
      yearly_accounting_status: [],
    },
    groupYearlyAccountListForModal: {
      year: '',
      yearly_accounting_status: [],
    },
    groupTransactionsError: {
      loading: false,
      statusCode: 0,
      errorMessage: '',
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
