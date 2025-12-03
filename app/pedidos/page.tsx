"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Save, X, Trash2 } from "lucide-react"

interface Pedido {
  id: string
  cliente: string
  fecha: string
  estado: "pendiente" | "procesando" | "enviado" | "entregado"
  total: number
  items: number
}

const PEDIDOS_INICIALES: Pedido[] = [
  { id: "PED-001", cliente: "José García", fecha: "2024-01-15", estado: "entregado", total: 8400, items: 3 }, // precios reducidos
  { id: "PED-002", cliente: "María López", fecha: "2024-01-18", estado: "enviado", total: 5600, items: 2 },
  { id: "PED-003", cliente: "Carlos Rodríguez", fecha: "2024-01-19", estado: "procesando", total: 10600, items: 4 },
  { id: "PED-004", cliente: "Ana Martínez", fecha: "2024-01-20", estado: "pendiente", total: 2800, items: 1 },
  { id: "PED-005", cliente: "Diego Flores", fecha: "2024-01-21", estado: "entregado", total: 13000, items: 5 },
]

const ESTADO_COLORES = {
  pendiente: "bg-yellow-100 text-yellow-800",
  procesando: "bg-blue-100 text-blue-800",
  enviado: "bg-purple-100 text-purple-800",
  entregado: "bg-green-100 text-green-800",
}

const ESTADO_ETIQUETAS = {
  pendiente: "Pendiente",
  procesando: "Procesando",
  enviado: "Enviado",
  entregado: "Entregado",
}

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>(PEDIDOS_INICIALES)
  const [editando, setEditando] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Pedido>>({})

  const iniciarEdicion = (pedido: Pedido) => {
    setEditando(pedido.id)
    setEditData(pedido)
  }

  const guardarEdicion = (id: string) => {
    setPedidos(pedidos.map((p) => (p.id === id ? { ...p, ...editData } : p)))
    setEditando(null)
  }

  const cancelarEdicion = () => {
    setEditando(null)
    setEditData({})
  }

  const eliminarPedido = (id: string) => {
    setPedidos(pedidos.filter((p) => p.id !== id))
  }

  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Panel de Pedidos</h1>
          <p className="text-muted-foreground">Gestiona todos tus pedidos en un solo lugar</p>
        </div>

        {/* Resumen */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Pedidos", value: pedidos.length, color: "bg-primary/10" },
            {
              label: "Pendientes",
              value: pedidos.filter((p) => p.estado === "pendiente").length,
              color: "bg-yellow-100",
            },
            {
              label: "En Tránsito",
              value: pedidos.filter((p) => p.estado === "enviado").length,
              color: "bg-purple-100",
            },
            {
              label: "Entregados",
              value: pedidos.filter((p) => p.estado === "entregado").length,
              color: "bg-green-100",
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

        {/* Tabla de pedidos */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
            <CardDescription>Haz clic en editar para modificar el estado o detalles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Cliente</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Fecha</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Items</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Total</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      {editando === pedido.id ? (
                        <>
                          <td className="px-4 py-3 text-sm text-foreground">{pedido.id}</td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={editData.cliente || ""}
                              onChange={(e) => setEditData({ ...editData, cliente: e.target.value })}
                              className="w-full px-2 py-1 rounded border border-border bg-background text-foreground"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="date"
                              value={editData.fecha || ""}
                              onChange={(e) => setEditData({ ...editData, fecha: e.target.value })}
                              className="w-full px-2 py-1 rounded border border-border bg-background text-foreground"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={editData.items || ""}
                              onChange={(e) => setEditData({ ...editData, items: Number.parseInt(e.target.value) })}
                              className="w-full px-2 py-1 rounded border border-border bg-background text-foreground"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={editData.total || ""}
                              onChange={(e) => setEditData({ ...editData, total: Number.parseInt(e.target.value) })}
                              className="w-full px-2 py-1 rounded border border-border bg-background text-foreground"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={editData.estado || ""}
                              onChange={(e) => setEditData({ ...editData, estado: e.target.value as any })}
                              className="w-full px-2 py-1 rounded border border-border bg-background text-foreground"
                            >
                              <option value="pendiente">Pendiente</option>
                              <option value="procesando">Procesando</option>
                              <option value="enviado">Enviado</option>
                              <option value="entregado">Entregado</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => guardarEdicion(pedido.id)}
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
                          <td className="px-4 py-3 text-sm font-medium text-foreground">{pedido.id}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{pedido.cliente}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{pedido.fecha}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{pedido.items}</td>
                          <td className="px-4 py-3 text-sm font-medium text-foreground">
                            S/ {(pedido.total / 100).toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${ESTADO_COLORES[pedido.estado]}`}
                            >
                              {ESTADO_ETIQUETAS[pedido.estado]}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => iniciarEdicion(pedido)}
                                className="p-1 text-primary hover:bg-primary/10 rounded transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => eliminarPedido(pedido.id)}
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
