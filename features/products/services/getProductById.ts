import api from "@/api/client";
import { IProduct } from "../types/product";

export const getProductById = async (id: string): Promise<IProduct> => {
  try {
    const response = await api.get<IProduct>(`/product/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get product by ID error:", error);
    throw new Error("Get product by ID failed. Please try again.");
  }
};
