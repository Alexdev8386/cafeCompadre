"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X } from "lucide-react"

const PRODUCTOS = [
  {
    id: 1,
    nombre: "Café Compadre Premium",
    origen: "Colombia",
    precio: 2800, // reducido a S/ 28.00
    peso: "250g",
    tueste: "Medio",
    notas: "Chocolate, Caramelo, Nueces",
    imagen: "/premium-coffee-bag.jpg",
  },
  {
    id: 2,
    nombre: "Compadre Single Origin Etiopía",
    origen: "Etiopía",
    precio: 3200, // reducido a S/ 32.00
    peso: "250g",
    tueste: "Ligero",
    notas: "Frutas Rojas, Floral, Té",
    imagen: "/ethiopian-coffee-bag.jpg",
  },
  {
    id: 3,
    nombre: "Blend Compadre Oscuro",
    origen: "Mezcla",
    precio: 2500, // reducido a S/ 25.00
    peso: "250g",
    tueste: "Oscuro",
    notas: "Chocolate Oscuro, Especias, Cuerpo Robusto",
    imagen: "/dark-roast-coffee.jpg",
  },
  {
    id: 4,
    nombre: "Café Compadre Perú",
    origen: "Perú",
    precio: 2200, // reducido a S/ 22.00
    peso: "250g",
    tueste: "Medio",
    notas: "Cacao, Almendra, Balance",
    imagen: "/peruvian-coffee-bag.jpg",
  },
  {
    id: 5,
    nombre: "Espresso Compadre",
    origen: "Italia",
    precio: 2600, // reducido a S/ 26.00
    peso: "250g",
    tueste: "Oscuro",
    notas: "Crema Abundante, Cuerpo Completo",
    imagen: "/espresso-coffee.jpg",
  },
  {
    id: 6,
    nombre: "Compadre Orgánico Certificado",
    origen: "Costa Rica",
    precio: 3500, // reducido a S/ 35.00
    peso: "250g",
    tueste: "Medio",
    notas: "Tropical, Miel, Limpio",
    imagen: "/organic-coffee-bag.jpg",
  },
]

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState("")
  const [filtroOrigen, setFiltroOrigen] = useState<string | null>(null)
  const [filtroTueste, setFiltroTueste] = useState<string | null>(null)

  const origenesUnicos = Array.from(new Set(PRODUCTOS.map((p) => p.origen)))
  const tuestesUnicos = Array.from(new Set(PRODUCTOS.map((p) => p.tueste)))

  const productosFiltrados = useMemo(() => {
    return PRODUCTOS.filter((producto) => {
      const coincideBusqueda =
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.notas.toLowerCase().includes(busqueda.toLowerCase())
      const coincideOrigen = !filtroOrigen || producto.origen === filtroOrigen
      const coincideTueste = !filtroTueste || producto.tueste === filtroTueste

      return coincideBusqueda && coincideOrigen && coincideTueste
    })
  }, [busqueda, filtroOrigen, filtroTueste])

  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Catálogo de Productos</h1>
          <p className="text-muted-foreground">Descubre nuestros cafés specialty seleccionados</p>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Busca por nombre o notas..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Filtro Origen */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Origen</label>
              <select
                value={filtroOrigen || ""}
                onChange={(e) => setFiltroOrigen(e.target.value || null)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todos</option>
                {origenesUnicos.map((origen) => (
                  <option key={origen} value={origen}>
                    {origen}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro Tueste */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tueste</label>
              <select
                value={filtroTueste || ""}
                onChange={(e) => setFiltroTueste(e.target.value || null)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todos</option>
                {tuestesUnicos.map((tueste) => (
                  <option key={tueste} value={tueste}>
                    {tueste}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón limpiar filtros */}
          {(busqueda || filtroOrigen || filtroTueste) && (
            <button
              onClick={() => {
                setBusqueda("")
                setFiltroOrigen(null)
                setFiltroTueste(null)
              }}
              className="mt-4 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <X className="w-4 h-4" />
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Grid de productos */}
        {productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosFiltrados.map((producto) => (
              <Card
                key={producto.id}
                className="hover:shadow-lg transition-shadow border-border hover:border-primary/50"
              >
                <CardContent className="p-0">
                  <div className="relative h-48 bg-muted overflow-hidden rounded-t-lg">
                    <img
                      src={producto.imagen || "/placeholder.svg"}
                      alt={producto.nombre}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {producto.tueste}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">{producto.nombre}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{producto.origen}</p>

                    <div className="space-y-2 mb-4">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Presentación:</span> {producto.peso}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-medium">Notas:</span> {producto.notas}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">S/ {(producto.precio / 100).toFixed(2)}</span>
                      <Button className="bg-primary hover:bg-primary/90">Agregar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No se encontraron productos con los filtros seleccionados.</p>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-8">
          Mostrando {productosFiltrados.length} de {PRODUCTOS.length} productos
        </p>
      </main>
    </>
  )
}
