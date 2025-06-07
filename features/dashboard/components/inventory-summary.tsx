"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../services/dashboard";

const statusData = [
  { status: "Aman", count: 32, fill: "#4CAF50" },
  { status: "Waspada", count: 10, fill: "#FFC107" },
  { status: "Kritis", count: 3, fill: "#F44336" },
];

export function InventorySummary() {
  const { data, isLoading } = useQuery<any, any, any>({
    queryKey: ["dashboard", "summary"],
    queryFn: getDashboardSummary,
  });

  const top8Ingredients =
    data?.ingredientSummaries
      ?.slice()
      .sort((a: any, b: any) => b.batchCount - a.batchCount)
      .slice(0, 8)
      .map((item: any, index: any) => ({
        ...item,
        fill: `hsl(${(index * 45) % 360}, 70%, 50%)`,
      })) || [];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Distribusi Kategori Bahan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-dvh">
            <ChartContainer
              config={{
                count: {
                  label: "Jumlah Batch",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={top8Ingredients}>
                  <XAxis dataKey="ingredientName" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="batchCount"
                    fill="var(--color-count)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status Kesegaran Batch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-dvh">
            <ChartContainer
              config={{
                count: {
                  label: "Jumlah Batch",
                  color: "#4CAF50",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data?.freshnessStatusSummaries}
                  layout="vertical"
                >
                  <XAxis type="number" />
                  <YAxis dataKey="status" type="category" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {data?.freshnessStatusSummaries.map(
                      (entry: any, index: number) => {
                        let fillColor = "#4CAF50";
                        if (entry.status === "RED") fillColor = "#EF4444";
                        else if (entry.status === "GREEN")
                          fillColor = "#4CAF50";
                        else if (entry.status === "ORANGE")
                          fillColor = "#F97316";

                        return <Cell key={`cell-${index}`} fill={fillColor} />;
                      }
                    )}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lokasi Penyimpanan</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.storageLocationSummaries && (
            <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
              {data.storageLocationSummaries.map((storage: any) => (
                <div
                  key={storage.id}
                  className="flex justify-between items-center"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {storage.location}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {storage.batchCount} batch
                    </div>
                  </div>
                  <Badge className="bg-primary">Aktif</Badge>
                </div>
              ))}
            </div>
          )}
          <Button variant="outline" className="w-full mt-4">
            Kelola Lokasi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
