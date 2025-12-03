"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Coffee } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Coffee className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-primary">Café Compadre</h1>
        </Link>

        <nav className="flex gap-1">
          {[
            { href: "/catalogo", label: "Catálogo" },
            { href: "/pedidos", label: "Pedidos" },
            { href: "/productores", label: "Productores" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive(href) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
