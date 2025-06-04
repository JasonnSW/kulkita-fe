import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InventorySummary } from "@/components/inventory-summary";
import { ExpiryAlertTable } from "@/components/expiry-alert-table";
import { UsageTrends } from "@/components/usage-trends";
import { WasteLossChart } from "@/components/waste-loss-chart";
import { EconomicLossReport } from "@/components/economic-loss-report";
import { Activity, Clipboard, DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Ringkasan stok dan status bahan segar SPPG Tanah Sareal
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Ekspor Data</Button>
          <Button>Tambah Batch Baru</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Stok Aktif
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245 kg</div>
            <p className="text-xs text-muted-foreground">
              Nilai: Rp 24,560,000
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Batch Aktif</CardTitle>
            <Clipboard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
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

      <Tabs defaultValue="inventory">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inventory">Status Stok</TabsTrigger>
          <TabsTrigger value="expiry">Mendekati Kadaluarsa</TabsTrigger>
          <TabsTrigger value="usage">Tren Penggunaan</TabsTrigger>
          <TabsTrigger value="waste">Waste Loss</TabsTrigger>
          <TabsTrigger value="economic">Kerugian Ekonomi</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="space-y-4">
          <InventorySummary />
        </TabsContent>
        <TabsContent value="expiry" className="space-y-4">
          <ExpiryAlertTable />
        </TabsContent>
        <TabsContent value="usage" className="space-y-4">
          <UsageTrends />
        </TabsContent>
        <TabsContent value="waste" className="space-y-4">
          <WasteLossChart />
        </TabsContent>
        <TabsContent value="economic" className="space-y-4">
          <EconomicLossReport />
        </TabsContent>
      </Tabs>
    </div>
  );
}
