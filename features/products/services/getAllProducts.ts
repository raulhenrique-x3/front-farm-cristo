import api from "@/api/client";
import { IProduct } from "../types/product";

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await api.get<IProduct[]>("/product/get-all");
    return response.data;
  } catch (error) {
    console.error("Get all products error:", error);
    throw new Error("Get all products failed. Please try again.");
  }
};
