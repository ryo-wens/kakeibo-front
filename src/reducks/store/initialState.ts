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
  },
  groups: {
    approvedGroups: [],
    unapprovedGroups: [],
    message: '',
  },
  modal: {
    message: '',
    open: false,
  },
};
export default initialState;
