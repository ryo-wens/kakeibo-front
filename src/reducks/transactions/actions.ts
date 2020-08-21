export type transactionActions = ReturnType<typeof addTransactionsAction>

export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS'
export const addTransactionsAction = (
  transaction_type:string,
  transaction_date:Date,
  shop:string,
  memo:string,
  amount:number,
  big_category_id:number,
  medium_category_id:number,
  custom_category_id:number
) => {
  return {
    type:ADD_TRANSACTIONS,
    payload: {
      transaction_type:transaction_type,
      transaction_date:transaction_date,
      shop:shop,
      memo:memo,
      amount:amount,
      big_category_id:big_category_id,
      medium_category_id:medium_category_id,
      custom_category_id:custom_category_id
    }
  }
}