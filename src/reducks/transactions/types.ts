export interface GetTransaction {
  id:number,
  transaction_type:string,
  updated_date:Date,
  transaction_date:string,
  shop?:string,
  memo?:string,
  amount:number,
  big_category_id:number,
  medium_category_id?:number,
  custom_category_id?:number
}

export interface AddTransactions {
  transaction_type: string,
  transaction_date: Date,
  shop?: string,
  mem?: string,
  amount: number,
  big_category_id: number,
  medium_category_id?: number,
  custom_category_id?: number
}
export interface Transactions extends Array<GetTransaction>{}