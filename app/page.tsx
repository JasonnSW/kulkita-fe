import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { CreateUnitForm } from "@/components/create-unit-form"
import { JoinUnitForm } from "@/components/join-unit-form"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container flex flex-col items-center justify-center min-h-screen py-12">
        <div className="flex flex-col items-center space-y-6 text-center mb-8">
          <div className="relative w-24 h-24 mb-2">
            <Image
              src="/placeholder.svg?height=96&width=96"
              alt="Kulkita Logo"
              width={96}
              height={96}
              className="rounded-full bg-primary p-2"
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Kulkita</h1>
          <p className="text-xl text-gray-600">Segar Terkelola, Gizi Tersalur</p>
          <p className="max-w-md text-gray-500">
            SPPG Stock Management pertama di Indonesia untuk mendukung keberlangsungan program Makan Bergizi Gratis 2025
          </p>
        </div>

        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Masuk</TabsTrigger>
                <TabsTrigger value="register">Daftar</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <Tabs defaultValue="create-unit">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="create-unit">Buat Unit</TabsTrigger>
                    <TabsTrigger value="join-unit">Gabung Unit</TabsTrigger>
                  </TabsList>
                  <TabsContent value="create-unit">
                    <RegisterForm />
                    <CreateUnitForm />
                  </TabsContent>
                  <TabsContent value="join-unit">
                    <RegisterForm />
                    <JoinUnitForm />
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">© 2025 Kulkita. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </main>
  )
}
