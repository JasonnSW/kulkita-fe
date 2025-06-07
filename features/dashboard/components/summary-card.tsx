"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Activity, Clipboard, DollarSign } from "lucide-react";
import React from "react";
import { getDashboardSummary } from "../services/dashboard";

export default function SummaryCard() {
  const { data, isLoading } = useQuery<any, any, any>({
    queryKey: ["dashboard", "summary"],
    queryFn: getDashboardSummary,
  });

  console.log("SummaryCard data:", data);

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
          <p className="text-xs text-muted-foreground">Nilai: Rp 24,560,000</p>
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
            <Badge variant="outline" className="bg-green-50">
              32 Aman
            </Badge>
            <Badge variant="outline" className="bg-yellow-50">
              10 Waspada
            </Badge>
            <Badge variant="outline" className="bg-red-50">
              3 Kritis
            </Badge>
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
          <p className="text-xs text-muted-foreground">
            Estimasi: Rp 1,250,000
          </p>
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
