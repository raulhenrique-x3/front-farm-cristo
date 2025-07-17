import api from "@/api/client";
import {
  ICreateProductPayload,
  ICreateProductResponse,
} from "../types/createProduct";

export const createProduct = async (
  payload: ICreateProductPayload
): Promise<ICreateProductResponse> => {
  try {
    const response = await api.post<ICreateProductResponse>(
      "/product/create",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw new Error("Register failed. Please try again.");
  }
};
