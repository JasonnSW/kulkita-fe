import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryTable } from "@/features/inventory/components/inventory-table"
import { AddBatchForm } from "@/features/inventory/components/add-batch-form"

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventaris</h1>
          <p className="text-muted-foreground">Kelola stok bahan segar SPPG Tanah Sareal</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Ekspor Data</Button>
          <Button>Tambah Batch Baru</Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Semua Bahan</TabsTrigger>
          <TabsTrigger value="sayur">Sayuran</TabsTrigger>
          <TabsTrigger value="buah">Buah</TabsTrigger>
          <TabsTrigger value="protein">Protein</TabsTrigger>
          <TabsTrigger value="pokok">Bahan Pokok</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <InventoryTable />
        </TabsContent>
        <TabsContent value="sayur" className="space-y-4">
          <InventoryTable category="sayur" />
        </TabsContent>
        <TabsContent value="buah" className="space-y-4">
          <InventoryTable category="buah" />
        </TabsContent>
        <TabsContent value="protein" className="space-y-4">
          <InventoryTable category="protein" />
        </TabsContent>
        <TabsContent value="pokok" className="space-y-4">
          <InventoryTable category="pokok" />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Tambah Batch Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <AddBatchForm />
        </CardContent>
      </Card>
    </div>
  )
}
