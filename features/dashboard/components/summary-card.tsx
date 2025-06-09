"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Activity, Clipboard, DollarSign } from "lucide-react";
import React from "react";
import { getDashboardSummary } from "../services/dashboard";

type Status = "GREEN" | "YELLOW" | "RED";

const colorMap: Record<Status, string> = {
  GREEN: "#4CAF50",
  YELLOW: "#FFC107",
  RED: "#EF4444",
};

const labelMap: Record<Status, string> = {
  GREEN: "Aman",
  YELLOW: "Waspada",
  RED: "Kritis",
};

export default function SummaryCard() {
  const { data, isLoading } = useQuery<any, any, any>({
    queryKey: ["dashboard", "summary"],
    queryFn: getDashboardSummary,
  });

  const freshnessData = data?.freshnessStatusSummaries
    ?.slice()
    .sort((a: { status: Status }, b: { status: Status }) => {
      const order: Record<Status, number> = {
        GREEN: 0,
        YELLOW: 1,
        RED: 2,
      };
      return order[a.status] - order[b.status];
    })
    .map((entry: { status: Status; [key: string]: any }) => {
      const fillColor = colorMap[entry.status];
      return { ...entry, fillColor };
    });

  // console.log("SummaryCard data:", data);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Stok Aktif
          </CardTitle>
          <DollarSign className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data?.totalActiveBatches ?? "-"}
          </div>
          {/* <p className="text-xs text-muted-foreground">Nilai: Rp 24,560,000</p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Batch Aktif</CardTitle>
          <Clipboard className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.totalActiveWeight}</div>
          <div className="flex gap-2 mt-1">
            {freshnessData?.map((entry: { status: Status; count: number }) => {
              const baseColor =
                entry.status === "GREEN"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : entry.status === "YELLOW"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : "bg-red-50 text-red-700 border-red-200";
              return (
                <Badge
                  key={entry.status}
                  variant="outline"
                  className={baseColor}
                >
                  {entry.count} {labelMap[entry.status]}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Potensi Food Loss
          </CardTitle>
          <Activity className="w-4 h-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24.5 kg</div>
          {/* <p className="text-xs text-muted-foreground">
            Estimasi: Rp 1,250,000
          </p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stok Menipis</CardTitle>
          <DollarSign className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5 Bahan</div>
          <p className="text-xs text-muted-foreground">
            Bayam, Tomat, Telur, Ayam, Wortel
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
