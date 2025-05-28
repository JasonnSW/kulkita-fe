"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  bahan: z.string({
    required_error: "Pilih bahan.",
  }),
  kategori: z.string({
    required_error: "Pilih kategori bahan.",
  }),
  berat: z.string().min(1, {
    message: "Masukkan berat bahan.",
  }),
  satuan: z.string({
    required_error: "Pilih satuan.",
  }),
  sumber: z.string().min(2, {
    message: "Masukkan sumber bahan.",
  }),
  lokasi: z.string({
    required_error: "Pilih lokasi penyimpanan.",
  }),
})

export function AddBatchForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bahan: "",
      kategori: "",
      berat: "",
      satuan: "",
      sumber: "",
      lokasi: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Batch berhasil ditambahkan",
        description: "Batch baru telah berhasil ditambahkan ke inventaris",
      })
      form.reset()
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="bahan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Bahan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bahan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bayam">Bayam</SelectItem>
                    <SelectItem value="tomat">Tomat</SelectItem>
                    <SelectItem value="wortel">Wortel</SelectItem>
                    <SelectItem value="ayam">Ayam</SelectItem>
                    <SelectItem value="telur">Telur</SelectItem>
                    <SelectItem value="jeruk">Jeruk</SelectItem>
                    <SelectItem value="beras">Beras</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kategori"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sayuran">Sayuran</SelectItem>
                    <SelectItem value="buah">Buah</SelectItem>
                    <SelectItem value="protein">Protein</SelectItem>
                    <SelectItem value="bahan_pokok">Bahan Pokok</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="berat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Berat/Jumlah</FormLabel>
                <FormControl>
                  <Input placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="satuan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satuan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih satuan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                    <SelectItem value="butir">Butir</SelectItem>
                    <SelectItem value="ikat">Ikat</SelectItem>
                    <SelectItem value="buah">Buah</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sumber Bahan</FormLabel>
                <FormControl>
                  <Input placeholder="Petani Lokal - Cibinong" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lokasi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lokasi Penyimpanan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kulkas1">Kulkas 1</SelectItem>
                    <SelectItem value="kulkas2">Kulkas 2</SelectItem>
                    <SelectItem value="freezer1">Freezer 1</SelectItem>
                    <SelectItem value="gudang">Gudang Kering</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Tambah Batch"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
