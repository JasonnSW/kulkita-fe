"use server"

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getIngredientUsage, getPredictionForecastDashboard } from "../services/forecast";

export async function getDehydratedForecastState() {
  const queryClient = new QueryClient();

  const today = new Date();
  const nextWeek = new Date();
  const lastWeek = new Date();
  nextWeek.setDate(today.getDate() + 6);
  lastWeek.setDate(today.getDate() - 6);

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["forecast", today.toISOString(), nextWeek.toISOString()],
      queryFn: () => getPredictionForecastDashboard(today, nextWeek),
    }),
    queryClient.prefetchQuery({
      queryKey: ["forecast-ingredient-usage", lastWeek.toISOString(), today.toISOString()],
      queryFn: () => getIngredientUsage(lastWeek, today),
    }),
  ]);

  return {
    state: dehydrate(queryClient),
  };
}
