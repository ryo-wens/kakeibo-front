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
    regularShoppingList: [],
    regularShoppingListLoading: false,
    regularShoppingListError: {
      message: '',
      statusCode: 0,
    },
    expiredShoppingList: [],
    expiredShoppingListLoading: false,
    expiredShoppingListError: {
      message: '',
      statusCode: 0,
    },
    todayShoppingList: [],
    todayShoppingListLoading: false,
    todayShoppingListError: {
      message: '',
      statusCode: 0,
    },
    todayShoppingListByCategories: [],
    todayShoppingListByCategoriesLoading: false,
    todayShoppingListByCategoriesError: {
      message: '',
      statusCode: 0,
    },
    monthlyShoppingList: [],
    monthlyShoppingListLoading: false,
    monthlyShoppingListError: {
      message: '',
      statusCode: 0,
    },
    monthlyShoppingListByCategories: [],
    monthlyShoppingListByCategoriesLoading: false,
    monthlyShoppingListByCategoriesError: {
      message: '',
      statusCode: 0,
    },
  },
  groupShoppingList: {
    groupRegularShoppingList: [],
    groupRegularShoppingListLoading: false,
    groupRegularShoppingListError: {
      message: '',
      statusCode: 0,
    },
    groupExpiredShoppingList: [],
    groupExpiredShoppingListLoading: false,
    groupExpiredShoppingListError: {
      message: '',
      statusCode: 0,
    },
    groupTodayShoppingList: [],
    groupTodayShoppingListLoading: false,
    groupTodayShoppingListError: {
      message: '',
      statusCode: 0,
    },
    groupTodayShoppingListByCategories: [],
    groupTodayShoppingListByCategoriesLoading: false,
    groupTodayShoppingListByCategoriesError: {
      message: '',
      statusCode: 0,
    },
    groupMonthlyShoppingList: [],
    groupMonthlyShoppingListLoading: false,
    groupMonthlyShoppingListError: {
      message: '',
      statusCode: 0,
    },
    groupMonthlyShoppingListByCategories: [],
    groupMonthlyShoppingListByCategoriesLoading: false,
    groupMonthlyShoppingListByCategoriesError: {
      message: '',
      statusCode: 0,
    },
  },
  todoList: {
    expiredTodoList: [],
    expiredTodoListLoading: false,
    expiredTodoListError: {
      message: '',
      statusCode: 0,
    },
    todayImplementationTodoList: [],
    todayDueTodoList: [],
    todayTodoListLoading: false,
    todayTodoListError: {
      message: '',
      statusCode: 0,
    },
    todayTodoListMessage: '',
    monthlyImplementationTodoList: [],
    monthlyDueTodoList: [],
    monthlyTodoListLoading: false,
    monthlyTodoListError: {
      message: '',
      statusCode: 0,
    },
    monthlyTodoListMessage: '',
    searchTodoList: [],
    searchTodoListLoading: false,
    searchTodoListError: {
      message: '',
      statusCode: 0,
    },
    searchTodoListMessage: '',
    todoListError: {
      message: '',
      statusCode: 0,
    },
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
