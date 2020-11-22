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
  transactions_list: GroupTransactionsList;
}

export interface deleteActionRes {
  message: string;
}

export interface GroupAccount {
  id: number;
  group_id: number;
  month: string;
  payer_user_id: string;
  recipient_user_id: string;
  payment_amount: number;
  payment_confirmation: boolean;
  receipt_confirmation: boolean;
}

export interface GroupAccounts extends Array<GroupAccount> {}

export interface GroupAccountList {
  group_id: number;
  month: string;
  group_total_payment_amount: number;
  group_average_payment_amount: number;
  group_remaining_amount: number;
  group_accounts_list: GroupAccounts;
}

export interface GroupAccountListRes {
  message: string;
  group_id: number;
  month: string;
  group_total_payment_amount: number;
  group_average_payment_amount: number;
  group_remaining_amount: number;
  group_accounts_list: GroupAccounts;
}
