import { QueryClient, useMutation } from "@tanstack/react-query";
import {
  deleteNotification,
  markAllNotificationAsRead,
  markNotificationAsRead,
} from "../services/notification";
import { toast } from "sonner";

export function useMarkNotificationAsRead(notificationId: string) {
  const queryClient = new QueryClient();
  return useMutation({
    mutationKey: ["notification", "mark-as-read", notificationId],
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "summary"] });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationKey: ["notification", "mark-all-as-read"],
    mutationFn: markAllNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "summary"] });
    },
  });
}

export function useDeleteNotification() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationKey: ["notification", "delete"],
    mutationFn: async (notificationId: string) => {
      await deleteNotification(notificationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "summary"] });
      toast.success("Notification deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete notification");
    },
  });
}
