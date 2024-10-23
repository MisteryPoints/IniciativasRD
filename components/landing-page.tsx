'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, Search } from "lucide-react" 
import Link from "next/link"

export function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <BookOpen className="h-6 w-6" />
          <span className="sr-only">Legislación Dominicana</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#proyectos">
            Proyectos de Ley
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#resoluciones">
            Resoluciones
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contacto">
            Contacto
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Legislación Dominicana al Alcance de Todos
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Explora los proyectos de ley y resoluciones de la República Dominicana. Mantente informado sobre el
                  proceso legislativo de tu país.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-white/10 text-white placeholder:text-gray-300" placeholder="Buscar..." type="text" />
                  <Button type="submit" variant="secondary">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section id="proyectos" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Proyectos de Ley</h2>
            <Tabs defaultValue="recientes" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recientes">Más Recientes</TabsTrigger>
                <TabsTrigger value="populares">Más Populares</TabsTrigger>
              </TabsList>
              <TabsContent value="recientes">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Proyecto de Ley de Educación Digital</CardTitle>
                      <CardDescription>Presentado el 15 de mayo, 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Este proyecto busca implementar programas de alfabetización digital en todas las escuelas públicas.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Ley de Protección Ambiental Costera</CardTitle>
                      <CardDescription>Presentado el 10 de mayo, 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Propone medidas para proteger los ecosistemas costeros y regular el desarrollo turístico sostenible.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="populares">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reforma del Sistema de Salud</CardTitle>
                      <CardDescription>2,500 comentarios públicos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Propone una restructuración integral del sistema de salud pública para mejorar la accesibilidad y calidad.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Ley de Energías Renovables</CardTitle>
                      <CardDescription>1,800 comentarios públicos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Busca incentivar la producción y uso de energías renovables en todo el territorio nacional.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section id="resoluciones" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Resoluciones</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>Resolución {i}/2024</CardTitle>
                    <CardDescription>Aprobada el {i * 5} de junio, 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Button className="mt-4" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Leer más
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="contacto" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Mantente Informado</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Suscríbete a nuestro boletín para recibir actualizaciones sobre nuevos proyectos de ley y resoluciones.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Input className="max-w-lg flex-1" placeholder="Ingresa tu correo electrónico" type="email" />
                  <Button type="submit">Suscribirse</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 Legislación Dominicana. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Términos de Servicio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  )
}