import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Home from '@/app/page'

describe('Prueba de Integración - Página Principal', () => {
  it('debe renderizar la página completa con todos sus elementos', () => {
    render(<Home />)
    
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('debe mostrar el título de bienvenida', () => {
    render(<Home />)
    const titulo = screen.getByText('Bienvenido a Café Compadre')
    expect(titulo).toBeInTheDocument()
  })

  it('debe mostrar las secciones principales del sistema', () => {
    render(<Home />)
    expect(screen.getByText('Catálogo de Productos')).toBeInTheDocument()
    expect(screen.getByText('Panel de Pedidos')).toBeInTheDocument()
    expect(screen.getByText('Módulo de Productores')).toBeInTheDocument()
  })
})
