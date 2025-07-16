import api from "@/api/client";
import { IRegisterPayload, IRegisterPayloadResponse } from "../types/auth";

const API_MASTER_KEY = process.env.EXPO_PUBLIC_API_MASTER_KEY;

export const register = async (
  payload: IRegisterPayload
): Promise<IRegisterPayloadResponse> => {
  try {
    const response = await api.post<IRegisterPayloadResponse>(
      "/auth/register",
      payload,
      {
        params: {
          "x-master-key": API_MASTER_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw new Error("Register failed. Please try again.");
  }
};
