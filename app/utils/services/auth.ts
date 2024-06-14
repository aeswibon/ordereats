import api from "@u/services/api";

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
  username: string,
  password: string
): Promise<void> => {
  await api.post("/add_user/", { username, password });
};
