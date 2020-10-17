const initialState = {
  categories: {
    incomeList: [],
    expenseList: [],
  },
  transactions: {
    transactionsList: [],
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
    group_tasks_list_for_each_user: [],
  },
  todoLists: {
    implementationTodoLists: [],
    dueTodoLists: [],
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
