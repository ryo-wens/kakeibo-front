export interface GroupTransactions {
  id: number;
  transaction_type: string;
  posted_date: Date;
  updated_date: Date;
  transaction_date: string;
  shop: string | null;
  memo: string | null;
  amount: number;
  posted_user_id: string;
  updated_user_id: string;
  payment_user_id: string;
  big_category_name: string;
  medium_category_name: string | null;
  custom_category_name: string | null;
}

export interface GroupTransactionsList extends Array<GroupTransactions> {}

export interface GroupLatestTransactionsListRes {
  transactions_list: GroupTransactionsList;
}

export interface GroupTransactionsReq {
  transaction_type: string;
  transaction_date: Date | null;
  shop: string | null;
  memo: string | null;
  amount: string | number;
  payment_user_id: string;
  big_category_id: number;
  medium_category_id: number | null;
  custom_category_id: number | null;
}

export interface FetchGroupTransactionsRes {
  message: string;
  transactions_list: [];
}

export interface deleteGroupTransactionRes {
  message: string;
}
