import api from "@u/services/api";
import { Response } from "@u/types";

interface LoginResponse {
  token: string;
  user: string;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("/token/", { username, password });
  return { token: response.data.access, user: username };
};

export const register = async (
  email: string,
  username: string,
  password: string
): Promise<Response<void>> => {
  const response = await api.post("/users/add_user/", {
    email,
    username,
    password,
  });
  return { status: response.status, data: undefined };
};
