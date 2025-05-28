"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Minus, Save, Search } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface UsageItem {
  id: string
  materialName: string
  quantity: number
  unit: string
  purpose: string
  batch?: string
}

export function UsageForm() {
  const [date, setDate] = useState<Date>(new Date())
  const [mealType, setMealType] = useState("")
  const [usageItems, setUsageItems] = useState<UsageItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [notes, setNotes] = useState("")

  const availableMaterials = [
    { id: "1", name: "Beras Premium", stock: 50, unit: "kg", batch: "B001" },
    { id: "2", name: "Ayam Fillet", stock: 25, unit: "kg", batch: "B002" },
    { id: "3", name: "Wortel", stock: 15, unit: "kg", batch: "B003" },
    { id: "4", name: "Bawang Merah", stock: 8, unit: "kg", batch: "B004" },
    { id: "5", name: "Minyak Goreng", stock: 20, unit: "liter", batch: "B005" },
    { id: "6", name: "Garam", stock: 5, unit: "kg", batch: "B006" },
  ]

  const filteredMaterials = availableMaterials.filter((material) =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addUsageItem = (material: any) => {
    const newItem: UsageItem = {
      id: Date.now().toString(),
      materialName: material.name,
      quantity: 1,
      unit: material.unit,
      purpose: mealType,
      batch: material.batch,
    }
    setUsageItems([...usageItems, newItem])
  }

  const updateUsageItem = (id: string, field: keyof UsageItem, value: any) => {
    setUsageItems((items) => items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removeUsageItem = (id: string) => {
    setUsageItems((items) => items.filter((item) => item.id !== id))
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      date,
      mealType,
      usageItems,
      notes,
    })
    // Reset form
    setUsageItems([])
    setNotes("")
  }

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Tanggal Penggunaan</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: id }) : "Pilih tanggal"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meal-type">Jenis Menu</Label>
          <Select value={mealType} onValueChange={setMealType}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis menu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sarapan">Sarapan</SelectItem>
              <SelectItem value="makan-siang">Makan Siang</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
              <SelectItem value="persiapan">Persiapan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">Cari Bahan</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cari bahan makanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Materials */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bahan Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredMaterials.map((material) => (
                <div
                  key={material.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="font-medium">{material.name}</div>
                    <div className="text-sm text-gray-500">
                      Stok: {material.stock} {material.unit} • Batch: {material.batch}
                    </div>
                  </div>
                  <Button size="sm" onClick={() => addUsageItem(material)} className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bahan yang Digunakan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {usageItems.length === 0 ? (
                <div className="text-center text-gray-500 py-8">Belum ada bahan yang dipilih</div>
              ) : (
                usageItems.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{item.materialName}</div>
                      <Button size="sm" variant="outline" onClick={() => removeUsageItem(item.id)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Jumlah</Label>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateUsageItem(item.id, "quantity", Number(e.target.value))}
                          min="0"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Satuan</Label>
                        <Input value={item.unit} disabled />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Keperluan</Label>
                      <Select
                        value={item.purpose}
                        onValueChange={(value) => updateUsageItem(item.id, "purpose", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih keperluan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sarapan">Sarapan</SelectItem>
                          <SelectItem value="makan-siang">Makan Siang</SelectItem>
                          <SelectItem value="snack">Snack</SelectItem>
                          <SelectItem value="persiapan">Persiapan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {item.batch && (
                      <Badge variant="outline" className="text-xs">
                        Batch: {item.batch}
                      </Badge>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Catatan Tambahan</Label>
        <Textarea
          id="notes"
          placeholder="Tambahkan catatan tentang penggunaan bahan..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      {/* Summary */}
      {usageItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ringkasan Penggunaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Item:</span>
                <span className="font-medium">{usageItems.length} jenis bahan</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tanggal:</span>
                <span className="font-medium">{format(date, "PPP", { locale: id })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Jenis Menu:</span>
                <span className="font-medium capitalize">{mealType || "-"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            setUsageItems([])
            setNotes("")
          }}
        >
          Reset
        </Button>
        <Button onClick={handleSubmit} disabled={usageItems.length === 0} className="bg-green-600 hover:bg-green-700">
          <Save className="mr-2 h-4 w-4" />
          Simpan Penggunaan
        </Button>
      </div>
    </div>
  )
}
