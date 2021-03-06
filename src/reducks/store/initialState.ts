import { date } from '../../lib/constant';

const initialState = {
  users: {
    user_id: '',
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
    groupsLoading: false,
    group: {
      groupId: 0,
      groupName: '',
    },
    groupUser: {
      groupId: 0,
      userId: '',
      userName: '',
      colorCode: '',
    },
    groupsError: {
      statusCode: null,
      errorMessage: '',
    },
  },
  categories: {
    incomeList: [],
    expenseList: [],
    incomeCategoriesLoading: false,
    expenseCategoriesLoading: false,
    categoriesError: {
      statusCode: null,
      errorMessage: '',
    },
  },
  groupCategories: {
    groupIncomeList: [],
    groupExpenseList: [],
    groupIncomeCategoriesLoading: false,
    groupExpenseCategoriesLoading: false,
    groupCategoriesError: {
      statusCode: null,
      errorMessage: '',
    },
  },
  transactions: {
    latestTransactionsList: [],
    latestTransactionsListLoading: false,
    latestTransactionsListError: {
      statusCode: null,
      errorMessage: '',
    },
    transactionsList: [],
    transactionsListLoading: false,
    transactionsListError: {
      statusCode: null,
      errorMessage: '',
    },
    searchTransactionsList: [],
    searchTransactionsListLoading: false,
    searchTransactionsListError: {
      statusCode: null,
      errorMessage: '',
    },
    noTransactionsMessage: '',
    notHistoryMessage: '',
  },
  groupTransactions: {
    groupLatestTransactionsList: [],
    groupLatestTransactionsListLoading: false,
    groupLatestTransactionsListError: {
      statusCode: null,
      errorMessage: '',
    },
    groupTransactionsList: [],
    groupTransactionsListLoading: false,
    groupTransactionsListError: {
      statusCode: null,
      errorMessage: '',
    },
    groupSearchTransactionsList: [],
    groupSearchTransactionsListLoading: false,
    groupSearchTransactionsListError: {
      statusCode: null,
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
      statusCode: null,
      errorMessage: '',
    },
    groupYearlyAccountList: {
      year: '',
      yearly_accounting_status: [],
    },
    groupYearlyAccountListLoading: false,
    groupYearlyAccountListError: {
      statusCode: null,
      errorMessage: '',
    },
    groupYearlyAccountListForModal: {
      year: '',
      yearly_accounting_status: [],
    },
    groupYearlyAccountListForModalLoading: false,
    groupYearlyAccountListForModalError: {
      statusCode: null,
      errorMessage: '',
    },
  },
  budgets: {
    standard_budgets_list: [],
    standardBudgetsLoading: false,
    standardBudgetsError: {
      statusCode: null,
      errorMessage: '',
    },
    yearly_budgets_list: {
      year: '',
      yearly_total_budget: null,
      monthly_budgets: [],
    },
    yearlyBudgetsLoading: false,
    yearlyBudgetsError: {
      statusCode: null,
      errorMessage: '',
    },
    custom_budgets_list: [],
    customBudgetsLoading: false,
    customBudgetsError: {
      statusCode: null,
      errorMessage: '',
    },
  },
  groupBudgets: {
    groupStandardBudgetsList: [],
    groupStandardBudgetsLoading: false,
    groupStandardBudgetsError: {
      statusCode: null,
      errorMessage: '',
    },
    groupCustomBudgetsList: [],
    groupCustomBudgetsLoading: false,
    groupCustomBudgetsError: {
      statusCode: null,
      errorMessage: '',
    },
    groupYearlyBudgetsList: {
      year: '',
      yearly_total_budget: null,
      monthly_budgets: [],
    },
    groupYearlyBudgetsLoading: false,
    groupYearlyBudgetsError: {
      statusCode: null,
      errorMessage: '',
    },
  },
  groupTasks: {
    groupTaskListForEachUser: [],
    groupTaskListForEachUserLoading: false,
    groupTaskListForEachUserError: {
      statusCode: null,
      errorMessage: '',
    },
    groupTaskList: [],
    groupTaskListLoading: false,
    groupTaskListError: {
      statusCode: null,
      errorMessage: '',
    },
    taskUsers: [],
    taskListItem: {
      id: 0,
      base_date: null,
      cycle_type: null,
      cycle: null,
      task_name: '',
      group_id: 0,
      group_tasks_users_id: null,
    },
    groupTaskError: {
      statusCode: null,
      errorMessage: '',
    },
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
    shoppingListItem: {
      id: 0,
      posted_date: date,
      updated_date: date,
      expected_purchase_date: '',
      complete_flag: false,
      purchase: '',
      shop: null,
      amount: null,
      big_category_id: 0,
      big_category_name: '',
      medium_category_id: null,
      medium_category_name: null,
      custom_category_id: null,
      custom_category_name: null,
      regular_shopping_list_id: null,
      transaction_auto_add: false,
      related_transaction_data: null,
    },
    regularShoppingListItem: {
      id: 0,
      posted_date: date,
      updated_date: date,
      expected_purchase_date: '',
      cycle_type: '',
      cycle: null,
      purchase: '',
      shop: null,
      amount: null,
      big_category_id: 0,
      big_category_name: '',
      medium_category_id: null,
      medium_category_name: null,
      custom_category_id: null,
      custom_category_name: null,
      transaction_auto_add: false,
    },
    shoppingListError: {
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
    groupShoppingListItem: {
      id: 0,
      posted_date: date,
      updated_date: date,
      expected_purchase_date: '',
      complete_flag: false,
      purchase: '',
      shop: null,
      amount: null,
      big_category_id: 0,
      big_category_name: '',
      medium_category_id: null,
      medium_category_name: null,
      custom_category_id: null,
      custom_category_name: null,
      regular_shopping_list_id: null,
      payment_user_id: null,
      transaction_auto_add: false,
      related_transaction_data: null,
    },
    groupRegularShoppingListItem: {
      id: 0,
      posted_date: date,
      updated_date: date,
      expected_purchase_date: '',
      cycle_type: '',
      cycle: null,
      purchase: '',
      shop: null,
      amount: null,
      big_category_id: 0,
      big_category_name: '',
      medium_category_id: null,
      medium_category_name: null,
      custom_category_id: null,
      custom_category_name: null,
      payment_user_id: null,
      transaction_auto_add: false,
    },
    groupShoppingListError: {
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
    monthlyImplementationTodoList: [],
    monthlyDueTodoList: [],
    monthlyTodoListLoading: false,
    monthlyTodoListError: {
      message: '',
      statusCode: 0,
    },
    searchTodoList: [],
    searchTodoListLoading: false,
    searchTodoListError: {
      message: '',
      statusCode: 0,
    },
    todoListItem: {
      id: 0,
      posted_date: date,
      updated_date: date,
      implementation_date: '',
      due_date: '',
      todo_content: '',
      complete_flag: false,
    },
    todoListError: {
      message: '',
      statusCode: 0,
    },
  },
  groupTodoList: {
    groupExpiredTodoList: [],
    groupExpiredTodoListLoading: false,
    groupExpiredTodoListError: {
      message: '',
      statusCode: 0,
    },
    groupTodayImplementationTodoList: [],
    groupTodayDueTodoList: [],
    groupTodayTodoListLoading: false,
    groupTodayTodoListError: {
      message: '',
      statusCode: 0,
    },
    groupMonthlyImplementationTodoList: [],
    groupMonthlyDueTodoList: [],
    groupMonthlyTodoListLoading: false,
    groupMonthlyTodoListError: {
      message: '',
      statusCode: 0,
    },
    groupSearchTodoList: [],
    groupSearchTodoListLoading: false,
    groupSearchTodoListError: {
      message: '',
      statusCode: 0,
    },
    groupTodoListItem: {
      id: 0,
      posted_date: date,
      updated_date: date,
      implementation_date: '',
      due_date: '',
      todo_content: '',
      complete_flag: false,
      user_id: '',
    },
    groupTodoListError: {
      message: '',
      statusCode: 0,
    },
  },
  modal: {
    message: '',
    open: false,
  },
};
export default initialState;
