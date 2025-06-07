"use server";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import {
  getDashboardSummary,
  getDashboardExpiryAlerts,
} from "@/features/dashboard/services/dashboard";

export async function getDehydratedDashboardState() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["dashboard", "summary"],
      queryFn: getDashboardSummary,
    }),
    queryClient.prefetchQuery({
      queryKey: ["dashboard", "expiry-alerts"],
      queryFn: getDashboardExpiryAlerts,
    }),
  ]);

  return {
    state: dehydrate(queryClient),
  };
}
