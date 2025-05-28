"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"

const expiryData = [
  {
    id: 1,
    kodeBatch: "BAYAM-20250521-K1-A",
    bahan: "Bayam",
    berat: "8.5 kg",
    tglMasuk: "21 Mei 2025",
    tglExpired: "22 Mei 2025",
    status: "Kritis",
  },
  {
    id: 2,
    kodeBatch: "TOMAT-20250520-K1-B",
    bahan: "Tomat",
    berat: "12.3 kg",
    tglMasuk: "20 Mei 2025",
    tglExpired: "23 Mei 2025",
    status: "Kritis",
  },
  {
    id: 3,
    kodeBatch: "AYAM-20250521-F1-A",
    bahan: "Ayam",
    berat: "15 kg",
    tglMasuk: "21 Mei 2025",
    tglExpired: "24 Mei 2025",
    status: "Waspada",
  },
  {
    id: 4,
    kodeBatch: "TELUR-20250520-K2-A",
    bahan: "Telur",
    berat: "120 butir",
    tglMasuk: "20 Mei 2025",
    tglExpired: "25 Mei 2025",
    status: "Waspada",
  },
  {
    id: 5,
    kodeBatch: "WORTEL-20250522-K1-A",
    bahan: "Wortel",
    berat: "10 kg",
    tglMasuk: "22 Mei 2025",
    tglExpired: "25 Mei 2025",
    status: "Waspada",
  },
]

export function ExpiryAlertTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Bahan Mendekati Kadaluarsa</h2>
        <Button variant="outline" size="sm">
          Lihat Semua
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode Batch</TableHead>
            <TableHead>Bahan</TableHead>
            <TableHead>Berat</TableHead>
            <TableHead>Tanggal Masuk</TableHead>
            <TableHead>Tanggal Expired</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Tindakan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expiryData.map((item) => (
            <TableRow
              key={item.id}
              className={item.status === "Kritis" ? "bg-red-50" : item.status === "Waspada" ? "bg-yellow-50" : ""}
            >
              <TableCell className="font-medium">{item.kodeBatch}</TableCell>
              <TableCell>{item.bahan}</TableCell>
              <TableCell>{item.berat}</TableCell>
              <TableCell>{item.tglMasuk}</TableCell>
              <TableCell>{item.tglExpired}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    item.status === "Kritis"
                      ? "border-red-500 text-red-500"
                      : item.status === "Waspada"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-green-500 text-green-500"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Buka menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Gunakan</DropdownMenuItem>
                    <DropdownMenuItem>Redistribusi</DropdownMenuItem>
                    <DropdownMenuItem>Buang</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
