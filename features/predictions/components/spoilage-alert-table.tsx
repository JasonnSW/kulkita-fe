"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data

type AlertItem = {
  id: number;
  kodeBatch: string;
  bahan: string;
  kategori: string;
  tglMasuk: string;
  tglExpired: string;
  prediksiSpoilage: string;
  konfidensiBusuk: number;
  faktorUtama: string;
  status: "Kritis" | "Waspada" | "Aman";
};

type AlertCategory = "all" | "critical" | "warning";

const alertData: Record<AlertCategory, AlertItem[]> = {
  critical: [
    {
      id: 1,
      kodeBatch: "BAYAM-20250521-K1-A",
      bahan: "Bayam",
      kategori: "Sayuran",
      tglMasuk: "21 Mei 2025",
      tglExpired: "22 Mei 2025",
      prediksiSpoilage: "22 Mei 2025 (Hari Ini)",
      konfidensiBusuk: 95,
      faktorUtama: "Suhu Penyimpanan",
      status: "Kritis",
    },
    {
      id: 2,
      kodeBatch: "TOMAT-20250520-K1-B",
      bahan: "Tomat",
      kategori: "Sayuran",
      tglMasuk: "20 Mei 2025",
      tglExpired: "23 Mei 2025",
      prediksiSpoilage: "22 Mei 2025 (Hari Ini)",
      konfidensiBusuk: 87,
      faktorUtama: "Kondisi Awal",
      status: "Kritis",
    },
    {
      id: 3,
      kodeBatch: "KANGKUNG-20250521-K2-A",
      bahan: "Kangkung",
      kategori: "Sayuran",
      tglMasuk: "21 Mei 2025",
      tglExpired: "22 Mei 2025",
      prediksiSpoilage: "22 Mei 2025 (Hari Ini)",
      konfidensiBusuk: 92,
      faktorUtama: "Usia Bahan",
      status: "Kritis",
    },
  ],
  warning: [
    {
      id: 4,
      kodeBatch: "AYAM-20250521-F1-A",
      bahan: "Ayam",
      kategori: "Protein",
      tglMasuk: "21 Mei 2025",
      tglExpired: "24 Mei 2025",
      prediksiSpoilage: "23 Mei 2025 (Besok)",
      konfidensiBusuk: 65,
      faktorUtama: "Suhu Penyimpanan",
      status: "Waspada",
    },
    {
      id: 5,
      kodeBatch: "WORTEL-20250522-K1-A",
      bahan: "Wortel",
      kategori: "Sayuran",
      tglMasuk: "22 Mei 2025",
      tglExpired: "25 Mei 2025",
      prediksiSpoilage: "24 Mei 2025 (2 Hari)",
      konfidensiBusuk: 45,
      faktorUtama: "Kelembapan",
      status: "Waspada",
    },
    {
      id: 6,
      kodeBatch: "TELUR-20250520-K2-A",
      bahan: "Telur",
      kategori: "Protein",
      tglMasuk: "20 Mei 2025",
      tglExpired: "25 Mei 2025",
      prediksiSpoilage: "24 Mei 2025 (2 Hari)",
      konfidensiBusuk: 40,
      faktorUtama: "Usia Bahan",
      status: "Waspada",
    },
  ],
  all: [], // Will be populated below
};

// Combine critical and warning for "all" category and add some safe items
alertData.all = [
  ...alertData.critical,
  ...alertData.warning,
  {
    id: 7,
    kodeBatch: "JERUK-20250522-K2-A",
    bahan: "Jeruk",
    kategori: "Buah",
    tglMasuk: "22 Mei 2025",
    tglExpired: "26 Mei 2025",
    prediksiSpoilage: "26 Mei 2025 (4 Hari)",
    konfidensiBusuk: 15,
    faktorUtama: "Normal",
    status: "Aman",
  },
  {
    id: 8,
    kodeBatch: "BERAS-20250515-G1-A",
    bahan: "Beras",
    kategori: "Bahan Pokok",
    tglMasuk: "15 Mei 2025",
    tglExpired: "15 Agt 2025",
    prediksiSpoilage: "15 Agt 2025 (85 Hari)",
    konfidensiBusuk: 2,
    faktorUtama: "Normal",
    status: "Aman",
  },
];

interface SpoilageAlertTableProps {
  status: "critical" | "warning" | "all";
}

export function SpoilageAlertTable({ status }: SpoilageAlertTableProps) {
  const { toast } = useToast();
  const data = alertData[status];

  const handleAction = (action: string, batch: string) => {
    toast({
      title: `Tindakan ${action} untuk ${batch}`,
      description: "Status bahan telah diperbarui",
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Kode Batch</TableHead>
          <TableHead>Bahan</TableHead>
          <TableHead>Prediksi Pembusukan</TableHead>
          <TableHead>Konfidensi</TableHead>
          <TableHead>Faktor Utama</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Tindakan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={item.id}
            className={
              item.status === "Kritis"
                ? "bg-red-50"
                : item.status === "Waspada"
                ? "bg-yellow-50"
                : "bg-green-50"
            }
          >
            <TableCell className="font-medium">{item.kodeBatch}</TableCell>
            <TableCell>{item.bahan}</TableCell>
            <TableCell>{item.prediksiSpoilage}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress
                  value={item.konfidensiBusuk}
                  className={`h-2 ${
                    item.konfidensiBusuk > 80
                      ? "bg-red-100"
                      : item.konfidensiBusuk > 40
                      ? "bg-yellow-100"
                      : "bg-green-100"
                  }`}
                  indicatorClassName={
                    item.konfidensiBusuk > 80
                      ? "bg-red-500"
                      : item.konfidensiBusuk > 40
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }
                />
                <span className="text-xs">{item.konfidensiBusuk}%</span>
              </div>
            </TableCell>
            <TableCell>{item.faktorUtama}</TableCell>
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
                  <DropdownMenuItem
                    onClick={() => handleAction("Gunakan", item.kodeBatch)}
                  >
                    Gunakan Segera
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction("Redistribusi", item.kodeBatch)}
                  >
                    Redistribusi
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction("Buang", item.kodeBatch)}
                  >
                    Tandai Busuk
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
