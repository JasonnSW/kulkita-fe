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

const menuFormSchema = z.object({
  menu: z.string({
    required_error: "Pilih menu.",
  }),
  porsi: z.string().min(1, {
    message: "Masukkan jumlah porsi.",
  }),
})

const manualFormSchema = z.object({
  bahan: z.string({
    required_error: "Pilih bahan.",
  }),
  batch: z.string({
    required_error: "Pilih batch.",
  }),
  jumlah: z.string().min(1, {
    message: "Masukkan jumlah yang digunakan.",
  }),
  satuan: z.string({
    required_error: "Pilih satuan.",
  }),
})

interface FifoUsageFormProps {
  type: "menu" | "manual"
}

export function FifoUsageForm({ type }: FifoUsageFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const menuForm = useForm<z.infer<typeof menuFormSchema>>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: {
      menu: "",
      porsi: "",
    },
  })

  const manualForm = useForm<z.infer<typeof manualFormSchema>>({
    resolver: zodResolver(manualFormSchema),
    defaultValues: {
      bahan: "",
      batch: "",
      jumlah: "",
      satuan: "",
    },
  })

  function onMenuSubmit(values: z.infer<typeof menuFormSchema>) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Menu berhasil digunakan",
        description: `${values.porsi} porsi ${values.menu} telah dicatat`,
      })
      menuForm.reset()
    }, 1000)
  }

  function onManualSubmit(values: z.infer<typeof manualFormSchema>) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Bahan berhasil digunakan",
        description: `${values.jumlah} ${values.satuan} ${values.bahan} dari batch ${values.batch} telah dicatat`,
      })
      manualForm.reset()
    }, 1000)
  }

  if (type === "menu") {
    return (
      <Form {...menuForm}>
        <form onSubmit={menuForm.handleSubmit(onMenuSubmit)} className="space-y-4">
          <FormField
            control={menuForm.control}
            name="menu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih menu" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nasi_ayam_sayur">Nasi Ayam Sayur</SelectItem>
                    <SelectItem value="sup_ayam">Sup Ayam</SelectItem>
                    <SelectItem value="capcay">Capcay</SelectItem>
                    <SelectItem value="telur_balado">Telur Balado</SelectItem>
                    <SelectItem value="tumis_kangkung">Tumis Kangkung</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={menuForm.control}
            name="porsi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Porsi</FormLabel>
                <FormControl>
                  <Input placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Gunakan Menu"}
            </Button>
          </div>
        </form>
      </Form>
    )
  }

  return (
    <Form {...manualForm}>
      <form onSubmit={manualForm.handleSubmit(onManualSubmit)} className="space-y-4">
        <FormField
          control={manualForm.control}
          name="bahan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bahan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih bahan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bayam">Bayam</SelectItem>
                  <SelectItem value="tomat">Tomat</SelectItem>
                  <SelectItem value="ayam">Ayam</SelectItem>
                  <SelectItem value="telur">Telur</SelectItem>
                  <SelectItem value="wortel">Wortel</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={manualForm.control}
          name="batch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih batch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BAYAM-20250521-K1-A">BAYAM-20250521-K1-A</SelectItem>
                  <SelectItem value="TOMAT-20250520-K1-B">TOMAT-20250520-K1-B</SelectItem>
                  <SelectItem value="AYAM-20250521-F1-A">AYAM-20250521-F1-A</SelectItem>
                  <SelectItem value="TELUR-20250520-K2-A">TELUR-20250520-K2-A</SelectItem>
                  <SelectItem value="WORTEL-20250522-K1-A">WORTEL-20250522-K1-A</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={manualForm.control}
            name="jumlah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl>
                  <Input placeholder="5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={manualForm.control}
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
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Gunakan Bahan"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
