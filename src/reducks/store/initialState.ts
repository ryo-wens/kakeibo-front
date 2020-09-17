const initialState = {
  categories: {
    incomeList: [],
    expenseList: [],
  },
  transactions: {
    transactionsList: [],
  },
  users: {
    user_id: '',
    user_name: '',
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
