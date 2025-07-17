import api from "@/api/client";
import { IUser } from "../types/getUser";

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const response = await api.get<IUser[]>("/user/get-all");
    return response.data;
  } catch (error) {
    console.error("Get all users error:", error);
    throw new Error("Get all users failed. Please try again.");
  }
};
