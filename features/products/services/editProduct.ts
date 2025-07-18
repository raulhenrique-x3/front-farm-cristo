import api from "@/api/client";
import { IProduct } from "../types/product";

export const editProduct = async (
  id: string,
  payload: IProduct
): Promise<IProduct> => {
  try {
    const response = await api.put<IProduct>(`/product/edit/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Edit product error:", error);
    throw new Error("Edit product failed. Please try again.");
  }
};
