"use server";

import { apiClient } from "@/lib/api-client";
import { cookies } from "next/headers";

export async function createBatch(payload: any) {
  const res = await apiClient("/api/batches", "POST", {
    body: JSON.stringify(payload),
  });
  // console.log("Batch created:", res);
  return res;
}

export async function getAllFifoItems() {
  const res = await apiClient("/api/fifo/batches", "GET");
  // console.log("Fetched inventory items:", res);
  return res;
}

export async function getAllByBatchesPriority() {
  const res = await apiClient("/api/fifo/all-batches-by-priority", "GET");
  // console.log("Fetched inventory items:", res);
  return res;
}

export async function getAllByMenu() {
  const res = await apiClient("/api/menus", "GET");
  // console.log("Fetched inventory items:", res);
  return res;
}

export async function createMenu(payload: any) {
  try {
    console.log("Creating menu with payload:", payload);
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";

    const res = await apiClient("/api/batches/use-for-menu", "POST", {
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error: any) {
    console.error("Error in createMenu:", error?.message || error);
    return {
      success: false,
      message: error?.message || "Terjadi kesalahan saat membuat menu",
    };
  }
}

export async function createMenuManual(payload: any) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";

    const res = await apiClient("/api/batches/use-manual", "POST", {
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error: any) {
    console.error("Error in createMenuManual:", error?.message || error);
    return {
      success: false,
      message: error?.message || "Terjadi kesalahan saat membuat menu manual",
    };
  }
}
