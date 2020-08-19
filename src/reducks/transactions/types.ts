export interface Transactions {
  transaction_type:string,
  transaction_date:Date,
  shop?:string,
  memo?:string,
  amount:number,
  big_category_id:number,
  medium_category_id?:number,
  custom_category_id?:number
}