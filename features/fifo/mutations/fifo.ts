import { QueryClient, useMutation } from "@tanstack/react-query";
import { createMenu, createMenuManual } from "../services/fifo";
import { toast } from "sonner";

export function useMenu() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: createMenu,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "summary"] });
      toast.success(`Menu berhasil dibuat: ${data.description}`);
    },
    onError: (error) => {
      toast.error(`Gagal menggunakan bahan: ${error.message}`);
    },
  });
}

export function useMenuManual() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: createMenuManual,
    onSuccess: (data: any) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });
}
