import api from "@/api/client";
import { IGetAllUsersResponse } from "../types/getUser";

export const getAllUsers = async (): Promise<IGetAllUsersResponse> => {
  try {
    const response = await api.get<IGetAllUsersResponse>("/user/get-all");
    return response.data;
  } catch (error) {
    console.error("Get all users error:", error);
    throw new Error("Get all users failed. Please try again.");
  }
};
