"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit2, Save, X, Trash2 } from "lucide-react"

interface Productor {
  id: string
  nombre: string
  region: string
  email: string
  telefono: string
  ultimaEntrega: string
  pagoPendiente: number
  estado: "activo" | "inactivo"
}

const PRODUCTORES_INICIALES: Productor[] = [
  {
    id: "PROD-001",
    nombre: "Finca Compadre Coffee",
    region: "Eje Cafetero",
    email: "finca@compadre.co",
    telefono: "310-555-0001",
    ultimaEntrega: "2024-01-20",
    pagoPendiente: 0,
    estado: "activo",
  },
  {
    id: "PROD-002",
    nombre: "Café Sierra Verde",
    region: "Nariño",
    email: "sierra@verde.co",
    telefono: "310-555-0002",
    ultimaEntrega: "2024-01-18",
    pagoPendiente: 28000, // reducido a S/ 280.00
    estado: "activo",
  },
  {
    id: "PROD-003",
    nombre: "Cooperativa Andina",
    region: "Huila",
    email: "coop@andina.co",
    telefono: "310-555-0003",
    ultimaEntrega: "2024-01-15",
    pagoPendiente: 15500, // reducido a S/ 155.00
    estado: "activo",
  },
  {
    id: "PROD-004",
    nombre: "Finca La Montaña",
    region: "Cauca",
    email: "montaña@finca.co",
    telefono: "310-555-0004",
    ultimaEntrega: "2024-01-10",
    pagoPendiente: 45000, // reducido a S/ 450.00
    estado: "inactivo",
  },
]

export default function Productores() {
  const [productores, setProductores] = useState<Productor[]>(PRODUCTORES_INICIALES)
  const [editando, setEditando] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Productor>>({})
  const [formularioNuevo, setFormularioNuevo] = useState(false)
  const [nuevoProductor, setNuevoProductor] = useState({
    nombre: "",
    region: "",
    email: "",
    telefono: "",
  })

  const iniciarEdicion = (productor: Productor) => {
    setEditando(productor.id)
    setEditData(productor)
  }

  const guardarEdicion = (id: string) => {
    setProductores(productores.map((p) => (p.id === id ? { ...p, ...editData } : p)))
    setEditando(null)
  }

  const cancelarEdicion = () => {
    setEditando(null)
    setEditData({})
  }

  const agregarProductor = () => {
    if (nuevoProductor.nombre && nuevoProductor.region) {
      const id = `PROD-${(productores.length + 1).toString().padStart(3, "0")}`
      setProductores([
        ...productores,
        {
          id,
          ...nuevoProductor,
          ultimaEntrega: new Date().toISOString().split("T")[0],
          pagoPendiente: 0,
          estado: "activo",
        },
      ])
      setNuevoProductor({ nombre: "", region: "", email: "", telefono: "" })
      setFormularioNuevo(false)
    }
  }

  const eliminarProductor = (id: string) => {
    setProductores(productores.filter((p) => p.id !== id))
  }

  const pagoPendienteTotal = productores.reduce((sum, p) => sum + p.pagoPendiente, 0)

  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Módulo de Productores</h1>
            <p className="text-muted-foreground">Gestiona productores, entregas y pagos</p>
          </div>
          <Button
            onClick={() => setFormularioNuevo(true)}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nuevo Productor
          </Button>
        </div>

        {/* Resumen financiero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Productores Activos",
              value: productores.filter((p) => p.estado === "activo").length,
              color: "bg-green-100",
            },
            {
              label: "Productores Inactivos",
              value: productores.filter((p) => p.estado === "inactivo").length,
              color: "bg-gray-100",
            },
            {
              label: "Pagos Pendientes",
              value: `S/ ${(pagoPendienteTotal / 100).toFixed(2)}`,
              color: "bg-yellow-100",
            },
          ].map((stat, i) => (
            <Card key={i} className="border-border">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Formulario nuevo productor */}
        {formularioNuevo && (
          <Card className="mb-8 border-border border-primary">
            <CardHeader>
              <CardTitle>Registrar Nuevo Productor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre de la finca/cooperativa"
                    value={nuevoProductor.nombre}
                    onChange={(e) => setNuevoProductor({ ...nuevoProductor, nombre: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Región</label>
                  <input
                    type="text"
                    placeholder="Ej: Eje Cafetero"
                    value={nuevoProductor.region}
                    onChange={(e) => setNuevoProductor({ ...nuevoProductor, region: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={nuevoProductor.email}
                    onChange={(e) => setNuevoProductor({ ...nuevoProductor, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Teléfono</label>
                  <input
                    type="tel"
                    placeholder="310-555-0000"
                    value={nuevoProductor.telefono}
                    onChange={(e) => setNuevoProductor({ ...nuevoProductor, telefono: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={agregarProductor} className="bg-primary hover:bg-primary/90">
                  Guardar Productor
                </Button>
                <Button onClick={() => setFormularioNuevo(false)} variant="outline">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabla de productores */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Registro de Productores</CardTitle>
            <CardDescription>Información de contacto, entregas y estado de pagos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Nombre</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Región</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Teléfono</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Última Entrega</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Pago Pendiente</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productores.map((productor) => (
                    <tr key={productor.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      {editando === productor.id ? (
                        <>
                          <td className="px-4 py-3 text-sm text-foreground">{productor.id}</td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={editData.nombre || ""}
                              onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                              className="w-full px-2 py-1 rounded border border-border bg-background text-foreground"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={editData.region || ""}
                              onChange={(e) => setEditData({ ...editData, region: e.target.value })}
                              className="w-full px-2 py-1 rounded border border-border bg-background text-foreground"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="email"
                              value={editData.email || ""}
                              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                              className="w-full px-2 py-1 rounded border border-border bg-background text-foreground"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="tel"
                              value={editData.telefono || ""}
                              onChange={(e) => setEditData({ ...editData, telefono: e.target.value })}
                              className="w-full px-2 py-1 rounded border border-border bg-background text-foreground"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="date"
                              value={editData.ultimaEntrega || ""}
                              onChange={(e) => setEditData({ ...editData, ultimaEntrega: e.target.value })}
                              className="w-full px-2 py-1 rounded border border-border bg-background text-foreground"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={editData.pagoPendiente || ""}
                              onChange={(e) =>
                                setEditData({ ...editData, pagoPendiente: Number.parseInt(e.target.value) })
                              }
                              className="w-full px-2 py-1 rounded border border-border bg-background text-foreground"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={editData.estado || ""}
                              onChange={(e) => setEditData({ ...editData, estado: e.target.value as any })}
                              className="w-full px-2 py-1 rounded border border-border bg-background text-foreground"
                            >
                              <option value="activo">Activo</option>
                              <option value="inactivo">Inactivo</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => guardarEdicion(productor.id)}
                                className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={cancelarEdicion}
                                className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3 text-sm font-medium text-foreground">{productor.id}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{productor.nombre}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{productor.region}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{productor.email}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{productor.telefono}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{productor.ultimaEntrega}</td>
                          <td className="px-4 py-3 text-sm font-medium text-foreground">
                            {productor.pagoPendiente > 0 ? (
                              <span className="text-red-600">S/ {(productor.pagoPendiente / 100).toFixed(2)}</span>
                            ) : (
                              <span className="text-green-600">Pagado</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                productor.estado === "activo"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {productor.estado === "activo" ? "Activo" : "Inactivo"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => iniciarEdicion(productor)}
                                className="p-1 text-primary hover:bg-primary/10 rounded transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => eliminarProductor(productor.id)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
