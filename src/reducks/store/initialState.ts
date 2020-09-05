const initialState = {
  categories: {
    incomeList: [],
    expenseList: [],
  },
  transactions: {
    transactionsList: [],
  },
  users: {
    isLoggedIn: false,
    userId: '',
    userName: '',
    email: '',
    password: '',
  },
  groups: {
    approvedGroups: [],
    unapprovedGroups: [],
  },
  modal: {
    message: '',
    open: false,
  },
};
export default initialState;
