"use server"

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getPredictionForecastDashboard } from "../services/forecast";
import { formatDateToString } from "@/utils/format-date";

export async function getDehydratedForecastState() {
  const queryClient = new QueryClient();

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 6);

  await queryClient.prefetchQuery({
    queryKey: [
      "forecast",
      formatDateToString(today),
      formatDateToString(nextWeek),
    ],
    queryFn: () => getPredictionForecastDashboard(today, nextWeek),
  });

  return {
    state: dehydrate(queryClient),
  };
}
