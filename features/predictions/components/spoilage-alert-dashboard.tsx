"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, ArrowRight, CheckCircle2, Clock, ThermometerIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SpoilageAlertTable } from "@/components/spoilage-alert-table"

const alertSummary = [
  { status: "Kritis", count: 3, icon: AlertCircle, color: "text-red-500" },
  { status: "Waspada", count: 10, icon: Clock, color: "text-yellow-500" },
  { status: "Aman", count: 32, icon: CheckCircle2, color: "text-green-500" },
]

export function SpoilageAlertDashboard() {
  const { toast } = useToast()
  const [timeframe, setTimeframe] = useState("today")

  const handleAction = (action: string) => {
    toast({
      title: `Tindakan ${action} berhasil`,
      description: "Status bahan telah diperbarui",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {alertSummary.map((alert, index) => (
          <Card key={index} className={alert.status === "Kritis" ? "border-red-200" : ""}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Status {alert.status}</CardTitle>
              <alert.icon className={`h-4 w-4 ${alert.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alert.count} Batch</div>
              <p className="text-xs text-muted-foreground mt-1">
                {alert.status === "Kritis"
                  ? "Perlu tindakan segera"
                  : alert.status === "Waspada"
                    ? "Pantau dalam 48 jam"
                    : "Tidak perlu tindakan"}
              </p>
              {alert.status !== "Aman" && (
                <Button
                  variant="link"
                  className={`px-0 ${alert.status === "Kritis" ? "text-red-500" : "text-yellow-500"}`}
                  onClick={() => handleAction(alert.status)}
                >
                  Lihat Detail
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Peringatan Dini Pembusukan</CardTitle>
              <CardDescription>Prediksi bahan yang berisiko busuk berdasarkan model machine learning</CardDescription>
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hari Ini</SelectItem>
                <SelectItem value="tomorrow">Besok</SelectItem>
                <SelectItem value="week">Minggu Ini</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="critical">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="critical">Kritis (3)</TabsTrigger>
              <TabsTrigger value="warning">Waspada (10)</TabsTrigger>
              <TabsTrigger value="all">Semua Batch (45)</TabsTrigger>
            </TabsList>
            <TabsContent value="critical">
              <SpoilageAlertTable status="critical" />
            </TabsContent>
            <TabsContent value="warning">
              <SpoilageAlertTable status="warning" />
            </TabsContent>
            <TabsContent value="all">
              <SpoilageAlertTable status="all" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Faktor Risiko Pembusukan</CardTitle>
            <CardDescription>Faktor yang mempengaruhi prediksi pembusukan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <ThermometerIcon className="h-4 w-4 mr-2 text-red-500" />
                    <span className="text-sm font-medium">Suhu Penyimpanan</span>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Kulkas 1 menunjukkan fluktuasi suhu yang dapat mempercepat pembusukan sayuran hijau
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="text-sm font-medium">Usia Bahan</span>
                  </div>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Beberapa batch sayuran sudah mencapai 70% masa simpan maksimalnya
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                    <span className="text-sm font-medium">Kondisi Awal</span>
                  </div>
                  <span className="text-sm font-medium">40%</span>
                </div>
                <Progress value={40} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Beberapa batch tomat menunjukkan tanda-tanda kerusakan saat penerimaan
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rekomendasi Tindakan</CardTitle>
            <CardDescription>Tindakan yang disarankan untuk mencegah pembusukan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Gunakan Batch Bayam Segera</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Batch BAYAM-20250521-K1-A diprediksi akan busuk dalam 24 jam. Prioritaskan penggunaan dalam menu
                    hari ini.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="destructive" onClick={() => handleAction("Gunakan Segera")}>
                      Gunakan Segera
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAction("Redistribusi")}>
                      Redistribusi
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Periksa Suhu Kulkas 1</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Suhu Kulkas 1 fluktuatif dalam 12 jam terakhir. Periksa pengaturan suhu untuk mencegah pembusukan
                    dini.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => handleAction("Periksa Suhu")}>
                    Tandai Sudah Diperiksa
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Atur Ulang Penyimpanan Tomat</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pindahkan batch tomat ke area dengan sirkulasi udara lebih baik untuk memperpanjang masa simpan.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => handleAction("Atur Ulang")}>
                    Tandai Selesai
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
