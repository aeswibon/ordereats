import api from "@u/services/api";
import { ICartItem, IOption } from "@u/types";

export const addToCart = async (
  productId: number,
  quantity: number,
  options: IOption[]
) => {
  await api.post("/cart/add_item/", {
    items: [
      {
        product: productId,
        quantity,
        selected_options: options,
      },
    ],
  });
};

export const removeFromCart = async (productId: number) => {
  await api.post("/cart/remove_item/", {
    items: [productId],
  });
};

export const getCart = async (): Promise<ICartItem[]> => {
  const { data } = await api.get("/cart/get_cart");
  return data.items;
};
