import api from "@u/services/api";
import { ICartItem } from "@u/types";

export const order = async (items: ICartItem[], total: number, tax: number) => {
  await api.post("/orders/", {
    items,
    total_price: total,
    tax,
  });
};
