import api from "@u/services/api";
import { ICartItem } from "@u/types";
import { toast } from "react-toastify";

export const order = async (
  total: number,
  tax: number,
  serviceFee: number,
  tip: number,
  items?: ICartItem[]
) => {
  if (!items) {
    toast.error("No items in cart");
  }
  await api.post("/orders/", {
    items,
    total_price: total,
    tax,
    service_fee: serviceFee,
    tip,
  });
};
