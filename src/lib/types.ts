export interface SelectItem {
  value: string | number;
  label: string;
}

export interface SelectItemList extends Array<SelectItem> {}
