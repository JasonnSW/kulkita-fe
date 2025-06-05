"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const inventoryData = [
  { category: "Sayur", count: 18, fill: "hsl(var(--chart-1))" },
  { category: "Buah", count: 12, fill: "hsl(var(--chart-2))" },
  { category: "Protein", count: 9, fill: "hsl(var(--chart-3))" },
  { category: "Bahan Pokok", count: 6, fill: "hsl(var(--chart-4))" },
  { category: "Snack", count: 7, fill: "hsl(var(--chart-5))" },
  { category: "Minuman", count: 10, fill: "hsl(var(--chart-6))" },
  { category: "Bumbu", count: 6, fill: "hsl(var(--chart-7))" },
  { category: "Frozen Food", count: 12, fill: "hsl(var(--chart-8))" },
];

const statusData = [
  { status: "Aman", count: 32, fill: "#4CAF50" },
  { status: "Waspada", count: 10, fill: "#FFC107" },
  { status: "Kritis", count: 3, fill: "#F44336" },
];

export function InventorySummary() {
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
                <BarChart data={inventoryData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
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
                <BarChart data={statusData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="status" type="category" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill="var(--color-count)"
                    radius={[0, 4, 4, 0]}
                  />
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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-sm font-medium">Kulkas 1</div>
                <div className="text-xs text-muted-foreground">18 batch</div>
              </div>
              <Badge className="bg-primary">Aktif</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-sm font-medium">Kulkas 2</div>
                <div className="text-xs text-muted-foreground">12 batch</div>
              </div>
              <Badge className="bg-primary">Aktif</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-sm font-medium">Freezer 1</div>
                <div className="text-xs text-muted-foreground">9 batch</div>
              </div>
              <Badge className="bg-primary">Aktif</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-sm font-medium">Gudang Kering</div>
                <div className="text-xs text-muted-foreground">6 batch</div>
              </div>
              <Badge className="bg-primary">Aktif</Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Kelola Lokasi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
