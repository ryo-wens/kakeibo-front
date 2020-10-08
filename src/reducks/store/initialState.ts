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
    yearly_budgets_list: [],
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
  todoLists: {
    implementationTodoLists: [],
    dueTodoLists: [],
    message: '',
  },
  groupTodoLists: {
    implementationTodoLists: [],
    dueTodoLists: [],
    message: '',
  },
  modal: {
    message: '',
    open: false,
  },
};
export default initialState;
