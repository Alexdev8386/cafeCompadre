import { describe, it, expect } from '@jest/globals'

function sumarPrecios(precio1: number, precio2: number): number {
  return precio1 + precio2
}

function calcularDescuento(precio: number, porcentaje: number): number {
  return precio - (precio * porcentaje / 100)
}

describe('Prueba Unitaria - Funciones de Utilidad', () => {
  describe('sumarPrecios', () => {
    it('debe sumar dos precios correctamente', () => {
      const resultado = sumarPrecios(10, 20)
      expect(resultado).toBe(30)
    })

    it('debe manejar precios decimales', () => {
      const resultado = sumarPrecios(10.50, 5.25)
      expect(resultado).toBe(15.75)
    })
  })

  describe('calcularDescuento', () => {
    it('debe calcular un descuento del 10%', () => {
      const resultado = calcularDescuento(100, 10)
      expect(resultado).toBe(90)
    })

    it('debe calcular un descuento del 50%', () => {
      const resultado = calcularDescuento(200, 50)
      expect(resultado).toBe(100)
    })
  })
})
