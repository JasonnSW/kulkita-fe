import { apiClient } from "@/lib/api-client";
import { inventorySchema } from "../schemas/inventory";
import { z } from "zod";

export async function createBatch(payload: z.infer<typeof inventorySchema>) {
  const res = await apiClient("/api/batches", "POST", {
    body: JSON.stringify(payload),
  });
  return res;
}

export async function getAllInventoryItems() {
  const res = await apiClient("/api/batches", "GET");
  return res;
}
