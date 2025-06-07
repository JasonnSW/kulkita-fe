"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBatch } from "@/features/inventory/services/inventory";
import { toast } from "sonner"

export function useCreateBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", "items"] });
      toast.success("Bahan berhasil ditambahkan ke inventaris.");
    },
    onError: () => {
      toast.error("Gagal menambahkan bahan ke inventaris. Silakan coba lagi.");
    },
  });
}
