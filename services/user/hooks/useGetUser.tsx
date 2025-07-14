import api from "@/api/client";
import { IUser } from "../types/user";

export const getUser = async () => {
  const response = await api.get<IUser>("/get-user");
  return response.data;
};
