"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts"

const wasteLossData = [
  { name: "Sayur", value: 50, color: "#4CAF50" },
  { name: "Buah", value: 20, color: "#2196F3" },
  { name: "Protein", value: 25, color: "#FFC107" },
  { name: "Bahan Pokok", value: 5, color: "#9C27B0" },
]

const wasteCauseData = [
  {
    kategori: "Sayur",
    jumlahTerbuang: "12.5 kg",
    persentase: "50%",
    penyebabUmum: "Pembusukan cepat",
  },
  {
    kategori: "Buah",
    jumlahTerbuang: "5 kg",
    persentase: "20%",
    penyebabUmum: "Terlalu matang",
  },
  {
    kategori: "Protein",
    jumlahTerbuang: "6.25 kg",
    persentase: "25%",
    penyebabUmum: "Penyimpanan tidak tepat",
  },
  {
    kategori: "Bahan Pokok",
    jumlahTerbuang: "1.25 kg",
    persentase: "5%",
    penyebabUmum: "Kemasan rusak",
  },
]

export function WasteLossChart() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Distribusi Waste per Kategori</CardTitle>
          <Select defaultValue="bulanIni">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mingguIni">Minggu Ini</SelectItem>
              <SelectItem value="bulanIni">Bulan Ini</SelectItem>
              <SelectItem value="3bulan">3 Bulan Terakhir</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteLossData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {wasteLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Penyebab Waste per Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kategori</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Persentase</TableHead>
                <TableHead>Penyebab Umum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wasteCauseData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.kategori}</TableCell>
                  <TableCell>{item.jumlahTerbuang}</TableCell>
                  <TableCell>{item.persentase}</TableCell>
                  <TableCell>{item.penyebabUmum}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
