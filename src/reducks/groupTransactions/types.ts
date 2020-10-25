export interface GroupTransactions {
  id: number;
  transaction_type: string;
  updated_date: Date;
  transaction_date: string;
  shop?: string | null;
  memo?: string | null;
  amount: number;
  big_category_name: string;
  medium_category_name?: string | null;
  custom_category_name?: string | null;
}

export interface GroupTransactionsList extends Array<GroupTransactions> {}

export interface GroupTransactionsReq {
  transaction_type: string;
  transaction_date: Date | null;
  shop: string | null;
  memo: string | null;
  amount: string | number;
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
