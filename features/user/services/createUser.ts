import api from "@/api/client";
import {
  IRegisterUserPayload,
  IRegisterUserResponse,
} from "../types/registerUser";

export const createUser = async (
  payload: IRegisterUserPayload
): Promise<IRegisterUserResponse> => {
  try {
    const response = await api.post<IRegisterUserResponse>(
      "/user/create",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw new Error("Register failed. Please try again.");
  }
};
