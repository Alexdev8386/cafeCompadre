"use client"
import Link from "next/link"
import { Coffee, Package, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Encabezado */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Coffee className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Café Compadre</h1>
          </div>
          <nav className="flex gap-6 items-center">
            <Link href="/catalogo" className="text-foreground hover:text-primary transition-colors">
              Catálogo
            </Link>
            <Link href="/pedidos" className="text-foreground hover:text-primary transition-colors">
              Pedidos
            </Link>
            <Link href="/productores" className="text-foreground hover:text-primary transition-colors">
              Productores
            </Link>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Bienvenido a Café Compadre</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sistema integral de comercio electrónico para café specialty. Gestiona tu catálogo, pedidos y productores en
            una única plataforma.
          </p>
        </div>

        {/* Tarjetas de módulos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Catálogo */}
          <Link href="/catalogo" className="group">
            <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Catálogo de Productos</h3>
              <p className="text-muted-foreground mb-4">
                Explora nuestros cafés specialty con filtros avanzados y descripción detallada de cada producto.
              </p>
              <Button variant="outline" className="w-full bg-transparent">
                Ver Catálogo
              </Button>
            </div>
          </Link>

          {/* Pedidos */}
          <Link href="/pedidos" className="group">
            <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Coffee className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Panel de Pedidos</h3>
              <p className="text-muted-foreground mb-4">
                Administra tus pedidos, visualiza estados y edita información directamente desde la tabla.
              </p>
              <Button variant="outline" className="w-full bg-transparent">
                Ir a Pedidos
              </Button>
            </div>
          </Link>

          {/* Productores */}
          <Link href="/productores" className="group">
            <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Módulo de Productores</h3>
              <p className="text-muted-foreground mb-4">
                Registra productores, gestiona entregas y controla pagos de forma centralizada.
              </p>
              <Button variant="outline" className="w-full bg-transparent">
                Ir a Productores
              </Button>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
