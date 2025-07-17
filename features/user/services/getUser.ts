import api from "@/api/client";
import { IUser } from "../types/getUser";

export const getUser = async (id: string): Promise<IUser> => {
  try {
    const response = await api.get<IUser>(`/user/get-by/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get user error:", error);
    throw new Error("Get user failed. Please try again.");
  }
};
