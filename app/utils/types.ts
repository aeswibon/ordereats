export interface Option {
  id: number;
  name: string;
  surcharge: number;
}

export interface OptionList {
  id: number;
  name: string;
  selection_type: "must_select_one" | "can_select_multiple_or_none";
  options: Option[];
}

export interface Product {
  id: number;
  name: string;
  base_price: number;
  option_lists: OptionList[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  options: Option[];
}
