import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { InventorySummary } from "@/features/dashboard/components/inventory-summary";
import { ExpiryAlertTable } from "@/features/dashboard/components/expiry-alert-table";
import { UsageTrends } from "@/features/dashboard/components/usage-trends";
import { WasteLossChart } from "@/features/dashboard/components/waste-loss-chart";
import { EconomicLossReport } from "@/features/dashboard/components/economic-loss-report";
import { HydrationBoundary } from "@tanstack/react-query";
import { getDehydratedDashboardState } from "@/features/dashboard/hooks/use-dashboard";
import SummaryCard from "@/features/dashboard/components/summary-card";

export default async function DashboardPage() {
  const { state } = await getDehydratedDashboardState();
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

      <HydrationBoundary state={state}>
        <SummaryCard />
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
      </HydrationBoundary>
    </div>
  );
}
