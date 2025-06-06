"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search } from "lucide-react";

type InventoryItem = {
  id: number;
  kodeBatch: string;
  bahan: string;
  kategori: "Sayuran" | "Buah" | "Protein" | "Bahan Pokok";
  berat: string;
  tglMasuk: string;
  tglExpired: string;
  lokasi: string;
  status: "Kritis" | "Waspada" | "Aman";
};

type InventoryCategory = "all" | "sayur" | "buah" | "protein" | "pokok";

// Sample data
const inventoryData: Record<InventoryCategory, InventoryItem[]> = {
  all: [
    {
      id: 1,
      kodeBatch: "BAYAM-20250521-K1-A",
      bahan: "Bayam",
      kategori: "Sayuran",
      berat: "8.5 kg",
      tglMasuk: "21 Mei 2025",
      tglExpired: "22 Mei 2025",
      lokasi: "Kulkas 1",
      status: "Kritis",
    },
    {
      id: 2,
      kodeBatch: "TOMAT-20250520-K1-B",
      bahan: "Tomat",
      kategori: "Sayuran",
      berat: "12.3 kg",
      tglMasuk: "20 Mei 2025",
      tglExpired: "23 Mei 2025",
      lokasi: "Kulkas 1",
      status: "Kritis",
    },
    {
      id: 3,
      kodeBatch: "AYAM-20250521-F1-A",
      bahan: "Ayam",
      kategori: "Protein",
      berat: "15 kg",
      tglMasuk: "21 Mei 2025",
      tglExpired: "24 Mei 2025",
      lokasi: "Freezer 1",
      status: "Waspada",
    },
    {
      id: 4,
      kodeBatch: "TELUR-20250520-K2-A",
      bahan: "Telur",
      kategori: "Protein",
      berat: "120 butir",
      tglMasuk: "20 Mei 2025",
      tglExpired: "25 Mei 2025",
      lokasi: "Kulkas 2",
      status: "Waspada",
    },
    {
      id: 5,
      kodeBatch: "WORTEL-20250522-K1-A",
      bahan: "Wortel",
      kategori: "Sayuran",
      berat: "10 kg",
      tglMasuk: "22 Mei 2025",
      tglExpired: "25 Mei 2025",
      lokasi: "Kulkas 1",
      status: "Waspada",
    },
    {
      id: 6,
      kodeBatch: "JERUK-20250522-K2-A",
      bahan: "Jeruk",
      kategori: "Buah",
      berat: "8 kg",
      tglMasuk: "22 Mei 2025",
      tglExpired: "26 Mei 2025",
      lokasi: "Kulkas 2",
      status: "Aman",
    },
    {
      id: 7,
      kodeBatch: "BERAS-20250515-G1-A",
      bahan: "Beras",
      kategori: "Bahan Pokok",
      berat: "25 kg",
      tglMasuk: "15 Mei 2025",
      tglExpired: "15 Agt 2025",
      lokasi: "Gudang Kering",
      status: "Aman",
    },
  ],
  sayur: [],
  buah: [],
  protein: [],
  pokok: [],
};

// Filter data by category
inventoryData.sayur = inventoryData.all.filter(
  (item) => item.kategori === "Sayuran"
);
inventoryData.buah = inventoryData.all.filter(
  (item) => item.kategori === "Buah"
);
inventoryData.protein = inventoryData.all.filter(
  (item) => item.kategori === "Protein"
);
inventoryData.pokok = inventoryData.all.filter(
  (item) => item.kategori === "Bahan Pokok"
);

interface InventoryTableProps {
  category?: "all" | "sayur" | "buah" | "protein" | "pokok";
}

export function InventoryTable({ category = "all" }: InventoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = inventoryData[category].filter(
    (item) =>
      item.kodeBatch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bahan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari batch atau bahan..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode Batch</TableHead>
            <TableHead>Bahan</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Berat</TableHead>
            <TableHead>Tanggal Masuk</TableHead>
            <TableHead>Tanggal Expired</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Tindakan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow
              key={item.id}
              className={
                item.status === "Kritis"
                  ? "bg-red-50"
                  : item.status === "Waspada"
                  ? "bg-yellow-50"
                  : ""
              }
            >
              <TableCell className="font-medium">{item.kodeBatch}</TableCell>
              <TableCell>{item.bahan}</TableCell>
              <TableCell>{item.kategori}</TableCell>
              <TableCell>{item.berat}</TableCell>
              <TableCell>{item.tglMasuk}</TableCell>
              <TableCell>{item.tglExpired}</TableCell>
              <TableCell>{item.lokasi}</TableCell>
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
                    <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                    <DropdownMenuItem>Gunakan</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Hapus</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
