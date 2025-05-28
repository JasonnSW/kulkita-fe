"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample data for purchase recommendations
const purchaseRecommendationData = [
  {
    id: 1,
    bahan: "Bayam",
    kategori: "Sayuran",
    stokSaatIni: "15 kg",
    prediksiKebutuhan: "120 kg",
    rekomendasiPembelian: "105 kg",
    estimasiHarga: "Rp 2,625,000",
    status: "Kritis",
    tren: "up",
  },
  {
    id: 2,
    bahan: "Tomat",
    kategori: "Sayuran",
    stokSaatIni: "30 kg",
    prediksiKebutuhan: "90 kg",
    rekomendasiPembelian: "60 kg",
    estimasiHarga: "Rp 1,800,000",
    status: "Perlu",
    tren: "down",
  },
  {
    id: 3,
    bahan: "Ayam",
    kategori: "Protein",
    stokSaatIni: "25 kg",
    prediksiKebutuhan: "80 kg",
    rekomendasiPembelian: "55 kg",
    estimasiHarga: "Rp 3,300,000",
    status: "Perlu",
    tren: "up",
  },
  {
    id: 4,
    bahan: "Telur",
    kategori: "Protein",
    stokSaatIni: "50 kg",
    prediksiKebutuhan: "70 kg",
    rekomendasiPembelian: "20 kg",
    estimasiHarga: "Rp 800,000",
    status: "Cukup",
    tren: "down",
  },
  {
    id: 5,
    bahan: "Wortel",
    kategori: "Sayuran",
    stokSaatIni: "20 kg",
    prediksiKebutuhan: "60 kg",
    rekomendasiPembelian: "40 kg",
    estimasiHarga: "Rp 1,000,000",
    status: "Perlu",
    tren: "up",
  },
  {
    id: 6,
    bahan: "Jeruk",
    kategori: "Buah",
    stokSaatIni: "40 kg",
    prediksiKebutuhan: "50 kg",
    rekomendasiPembelian: "10 kg",
    estimasiHarga: "Rp 500,000",
    status: "Cukup",
    tren: "up",
  },
  {
    id: 7,
    bahan: "Beras",
    kategori: "Bahan Pokok",
    stokSaatIni: "100 kg",
    prediksiKebutuhan: "150 kg",
    rekomendasiPembelian: "50 kg",
    estimasiHarga: "Rp 750,000",
    status: "Perlu",
    tren: "up",
  },
]

// Sample data for overstock and stockout risks
const stockRiskData = {
  overstock: [
    {
      id: 1,
      bahan: "Kentang",
      kategori: "Sayuran",
      stokSaatIni: "80 kg",
      prediksiKebutuhan: "40 kg",
      kelebihan: "40 kg",
      nilaiKelebihan: "Rp 800,000",
      rekomendasi: "Redistribusi 30 kg ke SPPG Bogor Utara",
    },
    {
      id: 2,
      bahan: "Apel",
      kategori: "Buah",
      stokSaatIni: "60 kg",
      prediksiKebutuhan: "30 kg",
      kelebihan: "30 kg",
      nilaiKelebihan: "Rp 1,200,000",
      rekomendasi: "Prioritaskan penggunaan dalam menu minggu ini",
    },
  ],
  stockout: [
    {
      id: 1,
      bahan: "Bayam",
      kategori: "Sayuran",
      stokSaatIni: "15 kg",
      prediksiKebutuhan: "120 kg",
      kekurangan: "105 kg",
      risikoImpact: "Tinggi",
      rekomendasi: "Pesan segera dari supplier utama",
    },
    {
      id: 2,
      bahan: "Ayam",
      kategori: "Protein",
      stokSaatIni: "25 kg",
      prediksiKebutuhan: "80 kg",
      kekurangan: "55 kg",
      risikoImpact: "Tinggi",
      rekomendasi: "Pesan segera dari supplier utama",
    },
  ],
}

// Sample data for supplier recommendations
const supplierRecommendationData = [
  {
    id: 1,
    supplier: "Tani Sejahtera",
    kategori: "Sayuran",
    bahan: "Bayam, Tomat, Wortel",
    hargaRataRata: "Rp 25,000/kg",
    kualitas: "Tinggi",
    leadTime: "1 hari",
    rekomendasi: "Supplier utama untuk sayuran hijau",
  },
  {
    id: 2,
    supplier: "Protein Prima",
    kategori: "Protein",
    bahan: "Ayam, Telur",
    hargaRataRata: "Rp 60,000/kg",
    kualitas: "Tinggi",
    leadTime: "2 hari",
    rekomendasi: "Supplier utama untuk protein hewani",
  },
  {
    id: 3,
    supplier: "Buah Nusantara",
    kategori: "Buah",
    bahan: "Jeruk, Apel",
    hargaRataRata: "Rp 40,000/kg",
    kualitas: "Sedang",
    leadTime: "1 hari",
    rekomendasi: "Alternatif supplier untuk buah-buahan",
  },
]

export function ForecastRecommendation() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredData = purchaseRecommendationData.filter(
    (item) =>
      (selectedCategory === "all" || item.kategori.toLowerCase() === selectedCategory) &&
      (item.bahan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleGeneratePurchaseOrder = () => {
    toast({
      title: "Rencana pembelian dibuat",
      description: "Rencana pembelian berhasil dibuat dan siap untuk diproses",
    })
  }

  const handleAdjustRecommendation = () => {
    toast({
      title: "Rekomendasi disesuaikan",
      description: "Rekomendasi pembelian telah disesuaikan berdasarkan preferensi Anda",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Rekomendasi Pembelian</CardTitle>
              <CardDescription>Rekomendasi pembelian bahan berdasarkan prediksi kebutuhan</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="sayuran">Sayuran</SelectItem>
                  <SelectItem value="buah">Buah</SelectItem>
                  <SelectItem value="protein">Protein</SelectItem>
                  <SelectItem value="bahan pokok">Bahan Pokok</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Cari bahan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bahan</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Stok Saat Ini</TableHead>
                <TableHead>Prediksi Kebutuhan</TableHead>
                <TableHead>Rekomendasi Pembelian</TableHead>
                <TableHead>Estimasi Harga</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tren</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.bahan}</TableCell>
                  <TableCell>{item.kategori}</TableCell>
                  <TableCell>{item.stokSaatIni}</TableCell>
                  <TableCell>{item.prediksiKebutuhan}</TableCell>
                  <TableCell>{item.rekomendasiPembelian}</TableCell>
                  <TableCell>{item.estimasiHarga}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.status === "Kritis"
                          ? "border-red-500 text-red-500"
                          : item.status === "Perlu"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-green-500 text-green-500"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.tren === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleAdjustRecommendation}>
            Sesuaikan Rekomendasi
          </Button>
          <Button onClick={handleGeneratePurchaseOrder}>Buat Rencana Pembelian</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risiko Stok</CardTitle>
          <CardDescription>Identifikasi risiko kelebihan dan kekurangan stok</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stockout">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="stockout">Risiko Stockout</TabsTrigger>
              <TabsTrigger value="overstock">Risiko Overstock</TabsTrigger>
            </TabsList>
            <TabsContent value="stockout">
              <div className="space-y-4">
                {stockRiskData.stockout.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-semibold">
                          {item.bahan} ({item.kategori})
                        </h4>
                        <Badge variant="outline" className="border-red-500 text-red-500">
                          Risiko {item.risikoImpact}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                        <div className="text-xs">
                          <span className="text-muted-foreground">Stok Saat Ini:</span> {item.stokSaatIni}
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">Prediksi Kebutuhan:</span> {item.prediksiKebutuhan}
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">Kekurangan:</span>{" "}
                          <span className="text-red-500 font-medium">{item.kekurangan}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium">Rekomendasi:</span> {item.rekomendasi}
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Tindak Lanjuti
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="overstock">
              <div className="space-y-4">
                {stockRiskData.overstock.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-semibold">
                          {item.bahan} ({item.kategori})
                        </h4>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                          Kelebihan Stok
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                        <div className="text-xs">
                          <span className="text-muted-foreground">Stok Saat Ini:</span> {item.stokSaatIni}
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">Prediksi Kebutuhan:</span> {item.prediksiKebutuhan}
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">Kelebihan:</span>{" "}
                          <span className="text-yellow-500 font-medium">{item.kelebihan}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium">Nilai Kelebihan:</span> {item.nilaiKelebihan}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="font-medium">Rekomendasi:</span> {item.rekomendasi}
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Tindak Lanjuti
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rekomendasi Supplier</CardTitle>
          <CardDescription>Supplier yang direkomendasikan berdasarkan kebutuhan prediksi</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Bahan</TableHead>
                <TableHead>Harga Rata-rata</TableHead>
                <TableHead>Kualitas</TableHead>
                <TableHead>Lead Time</TableHead>
                <TableHead>Rekomendasi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplierRecommendationData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.supplier}</TableCell>
                  <TableCell>{item.kategori}</TableCell>
                  <TableCell>{item.bahan}</TableCell>
                  <TableCell>{item.hargaRataRata}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.kualitas === "Tinggi"
                          ? "border-green-500 text-green-500"
                          : item.kualitas === "Sedang"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-red-500 text-red-500"
                      }
                    >
                      {item.kualitas}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.leadTime}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{item.rekomendasi}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
