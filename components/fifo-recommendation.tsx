"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const fifoData = [
  {
    id: 1,
    kodeBatch: "BAYAM-20250521-K1-A",
    bahan: "Bayam",
    kategori: "Sayuran",
    berat: "8.5 kg",
    tglMasuk: "21 Mei 2025",
    tglExpired: "22 Mei 2025",
    sisaWaktu: "1 hari",
    prioritas: "Sangat Tinggi",
    progress: 10,
  },
  {
    id: 2,
    kodeBatch: "TOMAT-20250520-K1-B",
    bahan: "Tomat",
    kategori: "Sayuran",
    berat: "12.3 kg",
    tglMasuk: "20 Mei 2025",
    tglExpired: "23 Mei 2025",
    sisaWaktu: "2 hari",
    prioritas: "Tinggi",
    progress: 25,
  },
  {
    id: 3,
    kodeBatch: "AYAM-20250521-F1-A",
    bahan: "Ayam",
    kategori: "Protein",
    berat: "15 kg",
    tglMasuk: "21 Mei 2025",
    tglExpired: "24 Mei 2025",
    sisaWaktu: "3 hari",
    prioritas: "Sedang",
    progress: 40,
  },
  {
    id: 4,
    kodeBatch: "TELUR-20250520-K2-A",
    bahan: "Telur",
    kategori: "Protein",
    berat: "120 butir",
    tglMasuk: "20 Mei 2025",
    tglExpired: "25 Mei 2025",
    sisaWaktu: "4 hari",
    prioritas: "Sedang",
    progress: 55,
  },
  {
    id: 5,
    kodeBatch: "WORTEL-20250522-K1-A",
    bahan: "Wortel",
    kategori: "Sayuran",
    berat: "10 kg",
    tglMasuk: "22 Mei 2025",
    tglExpired: "25 Mei 2025",
    sisaWaktu: "4 hari",
    prioritas: "Sedang",
    progress: 60,
  },
]

export function FifoRecommendation() {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        Berikut adalah rekomendasi penggunaan bahan berdasarkan prinsip FIFO (First In, First Out) dan tanggal
        kadaluarsa. Bahan dengan prioritas lebih tinggi harus digunakan terlebih dahulu.
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode Batch</TableHead>
            <TableHead>Bahan</TableHead>
            <TableHead>Berat</TableHead>
            <TableHead>Tanggal Masuk</TableHead>
            <TableHead>Tanggal Expired</TableHead>
            <TableHead>Sisa Waktu</TableHead>
            <TableHead>Prioritas</TableHead>
            <TableHead>Masa Simpan</TableHead>
            <TableHead className="text-right">Tindakan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fifoData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.kodeBatch}</TableCell>
              <TableCell>{item.bahan}</TableCell>
              <TableCell>{item.berat}</TableCell>
              <TableCell>{item.tglMasuk}</TableCell>
              <TableCell>{item.tglExpired}</TableCell>
              <TableCell>{item.sisaWaktu}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    item.prioritas === "Sangat Tinggi"
                      ? "border-red-500 text-red-500"
                      : item.prioritas === "Tinggi"
                        ? "border-orange-500 text-orange-500"
                        : "border-yellow-500 text-yellow-500"
                  }
                >
                  {item.prioritas}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={item.progress} className="h-2" />
                  <span className="text-xs">{item.progress}%</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">
                  Gunakan
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
