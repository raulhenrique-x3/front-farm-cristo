import api from "@/api/client";

export const donateMedicine = async (
  elderlyId: string,
  medicineId: string,
  quantity: number
): Promise<void> => {
  try {
    await api.post(`/withdrawal/donate`, {
      userId: elderlyId,
      productId: medicineId,
      quantity,
    });
  } catch (error) {
    console.error("Donate medicine error:", error);
    throw new Error("Donate medicine failed. Please try again.");
  }
};
