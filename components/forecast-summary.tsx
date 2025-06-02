"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Bar, BarChart, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, Calendar, BarChart3 } from "lucide-react"

type ForecastEntry = {
  day?: string
  week?: string
  sayuran: number
  buah: number
  protein: number
  total: number
}

// Sample data for weekly forecast
const weeklyForecastData = [
  { day: "Senin", sayuran: 45, buah: 30, protein: 25, total: 100 },
  { day: "Selasa", sayuran: 50, buah: 35, protein: 30, total: 115 },
  { day: "Rabu", sayuran: 40, buah: 25, protein: 20, total: 85 },
  { day: "Kamis", sayuran: 55, buah: 30, protein: 35, total: 120 },
  { day: "Jumat", sayuran: 60, buah: 40, protein: 30, total: 130 },
  { day: "Sabtu", sayuran: 35, buah: 20, protein: 15, total: 70 },
  { day: "Minggu", sayuran: 30, buah: 15, protein: 10, total: 55 },
]

// Sample data for monthly forecast
const monthlyForecastData = [
  { week: "Minggu 1", sayuran: 280, buah: 180, protein: 150, total: 610 },
  { week: "Minggu 2", sayuran: 300, buah: 200, protein: 170, total: 670 },
  { week: "Minggu 3", sayuran: 320, buah: 210, protein: 180, total: 710 },
  { week: "Minggu 4", sayuran: 290, buah: 190, protein: 160, total: 640 },
]

// Sample data for top ingredients
const topIngredientsData = [
  { name: "Bayam", forecast: 120, previous: 100, change: 20, fill: "hsl(var(--chart-1))" },
  { name: "Tomat", forecast: 90, previous: 95, change: -5, fill: "hsl(var(--chart-2))" },
  { name: "Ayam", forecast: 80, previous: 70, change: 10, fill: "hsl(var(--chart-3))" },
  { name: "Telur", forecast: 70, previous: 75, change: -5, fill: "hsl(var(--chart-4))" },
  { name: "Wortel", forecast: 60, previous: 50, change: 10, fill: "hsl(var(--chart-5))" },
]

// Sample data for menu forecast
const menuForecastData = [
  { name: "Nasi Ayam Sayur", forecast: 450, previous: 400, change: 50 },
  { name: "Sup Ayam", forecast: 350, previous: 380, change: -30 },
  { name: "Capcay", forecast: 300, previous: 280, change: 20 },
  { name: "Telur Balado", forecast: 250, previous: 270, change: -20 },
  { name: "Tumis Kangkung", forecast: 200, previous: 180, change: 20 },
]

export function ForecastSummary() {
  const [forecastPeriod, setForecastPeriod] = useState("week")
  const [forecastData, setForecastData] = useState<ForecastEntry[]>(weeklyForecastData)
  const [xAxisKey, setXAxisKey] = useState("day")

  const handlePeriodChange = (value: string) => {
    setForecastPeriod(value)
    if (value === "week") {
      setForecastData(weeklyForecastData)
      setXAxisKey("day")
    } else if (value === "month") {
      setForecastData(monthlyForecastData)
      setXAxisKey("week")
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Kebutuhan Prediksi</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">675 kg</div>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <ArrowUpIcon className="h-3 w-3 mr-1 text-green-500" />
              <span>Naik 8% dari periode sebelumnya</span>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              <span className="font-medium">Estimasi biaya:</span> Rp 16,875,000
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Distribusi Kategori</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Sayuran: 350 kg
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Buah: 200 kg
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                Protein: 125 kg
              </Badge>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              <span className="font-medium">Kategori tumbuh tercepat:</span> Sayuran (+12%)
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Periode Prediksi</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">23 - 29 Mei 2025</div>
            <div className="mt-3 text-xs text-muted-foreground">
              <span className="font-medium">Akurasi prediksi:</span> 92% berdasarkan data historis
            </div>
            <Button variant="link" className="px-0 text-xs mt-1">
              Lihat detail akurasi
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Prediksi Kebutuhan Bahan</CardTitle>
              <CardDescription>Estimasi kebutuhan bahan segar berdasarkan model prediksi</CardDescription>
            </div>
            <Select value={forecastPeriod} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Mingguan</SelectItem>
                <SelectItem value="month">Bulanan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-dvh">
            <ChartContainer
              config={{
                sayuran: {
                  label: "Sayuran (kg)",
                  color: "hsl(var(--chart-1))",
                },
                buah: {
                  label: "Buah (kg)",
                  color: "hsl(var(--chart-2))",
                },
                protein: {
                  label: "Protein (kg)",
                  color: "hsl(var(--chart-3))",
                },
                total: {
                  label: "Total (kg)",
                  color: "hsl(var(--chart-4))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xAxisKey} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sayuran"
                    stroke="var(--color-sayuran)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="buah" stroke="var(--color-buah)" strokeWidth={2} />
                  <Line type="monotone" dataKey="protein" stroke="var(--color-protein)" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="var(--color-total)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Bahan Prediksi</CardTitle>
            <CardDescription>Bahan dengan kebutuhan tertinggi untuk periode mendatang</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-dvh">
              <ChartContainer
                config={{
                  forecast: {
                    label: "Prediksi (kg)",
                    color: "#4CAF50",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topIngredientsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="forecast" fill="var(--color-forecast)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prediksi Menu Populer</CardTitle>
            <CardDescription>Menu dengan prediksi porsi tertinggi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menuForecastData.map((menu, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{menu.name}</div>
                    <div className="text-xs text-muted-foreground">Prediksi: {menu.forecast} porsi</div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`text-sm font-medium flex items-center ${
                        menu.change > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {menu.change > 0 ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(menu.change)} porsi
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perbandingan dengan Periode Sebelumnya</CardTitle>
          <CardDescription>Perubahan kebutuhan bahan dibandingkan periode sebelumnya</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-dvh">
            <ChartContainer
              config={{
                forecast: {
                  label: "Prediksi (kg)",
                  color: "hsl(var(--chart-1))",
                },
                previous: {
                  label: "Periode Sebelumnya (kg)",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topIngredientsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="forecast" fill="var(--color-forecast)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="previous" fill="var(--color-previous)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
