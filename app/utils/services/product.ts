import api from "@u/services/api";
import { IProduct } from "@u/types";

export const getProducts = async (): Promise<Array<IProduct>> => {
  const response = await api.get("/products");
  console.log("response", response);
  return response.data;
};
