import { describe, it, expect } from '@jest/globals'

function procesarPedidos(cantidad: number): string[] {
  const pedidos: string[] = []
  for (let i = 0; i < cantidad; i++) {
    pedidos.push(`Pedido #${i + 1}`)
  }
  return pedidos
}

function buscarProducto(productos: string[], busqueda: string): string | undefined {
  return productos.find(p => p.includes(busqueda))
}

describe('Prueba de Rendimiento - Operaciones del Sistema', () => {
  it('debe procesar 1000 pedidos en menos de 50ms', () => {
    const inicio = performance.now()
    const pedidos = procesarPedidos(1000)
    const fin = performance.now()
    const tiempoEjecucion = fin - inicio

    expect(pedidos.length).toBe(1000)
    expect(tiempoEjecucion).toBeLessThan(50)
  })

  it('debe procesar 10000 pedidos en menos de 200ms', () => {
    const inicio = performance.now()
    const pedidos = procesarPedidos(10000)
    const fin = performance.now()
    const tiempoEjecucion = fin - inicio

    expect(pedidos.length).toBe(10000)
    expect(tiempoEjecucion).toBeLessThan(200)
  })

  it('debe buscar productos rápidamente en un catálogo grande', () => {
    const productos = Array.from({ length: 5000 }, (_, i) => `Café ${i + 1}`)
    
    const inicio = performance.now()
    const resultado = buscarProducto(productos, 'Café 2500')
    const fin = performance.now()
    const tiempoEjecucion = fin - inicio

    expect(resultado).toBe('Café 2500')
    expect(tiempoEjecucion).toBeLessThan(50)
  })
})
