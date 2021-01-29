import { ReactElement } from 'react';

export interface FetchTransactions {
  id: number;
  transaction_type: string;
  posted_date: Date;
  updated_date: Date;
  transaction_date: string;
  shop: string | null;
  memo: string | null;
  amount: number;
  big_category_id: number;
  big_category_name: string;
  medium_category_id: number;
  medium_category_name: string | null;
  custom_category_id: number;
  custom_category_name: string | null;
}

export interface PieChartData {
  big_category_name: string;
  amount: number;
}

export interface HistoryRow {
  historyRow: ReactElement[];
}

export interface HistoryRowItem {
  rowItem: ReactElement[];
  prevTransactionDate: string;
}

export interface HistoryRows {
  headerRow: ReactElement[];
  operationRow: ReactElement[];
  subTotalAmountRow: ReactElement[];
  weekNum: number;
}

export interface PieChartDataList extends Array<PieChartData> {}

export interface FetchTransactionsRes {
  transactions_list: TransactionsList;
  message: string;
}

export interface FetchLatestTransactionsRes {
  transactions_list: TransactionsList;
}

export interface TransactionsReq {
  transaction_type: string;
  transaction_date: Date | null;
  shop: string | null;
  memo: string | null;
  amount: string | number;
  big_category_id: number;
  medium_category_id: number | null;
  custom_category_id: number | null;
}

export interface TransactionsRes {
  id: number;
  transaction_type: string;
  posted_date: Date;
  updated_date: Date;
  transaction_date: string;
  shop: string | null;
  memo: string | null;
  amount: number;
  big_category_id: number;
  big_category_name: string;
  medium_category_id: number;
  medium_category_name: string | null;
  custom_category_id: number;
  custom_category_name: string | null;
}

export interface DeleteTransactionRes {
  message: string;
}

export interface TransactionsList extends Array<FetchTransactions> {}
