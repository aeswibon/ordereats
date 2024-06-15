export interface IOption {
  id: number;
  name: string;
  surcharge: number;
}

export interface IOptionList {
  id: number;
  name: string;
  selection_type: "must_select_one" | "can_select_multiple_or_none";
  options: IOption[];
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  base_price: number;
  option_lists: IOptionList[];
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
  options: IOption[];
}

export type Response<T> = {
  status: number;
  data: T;
};
