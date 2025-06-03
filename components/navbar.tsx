"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { name: "Início", href: "#hero" },
  { name: "História", href: "#historia" },
  { name: "Pilares", href: "#pilares" },
  { name: "Jornada", href: "#jornada" },
  { name: "Adesivos", href: "#adesivos" },
  { name: "Depoimentos", href: "#depoimentos" },
  { name: "Famílias", href: "#familias" },
  { name: "Memória", href: "#memoria" },
  { name: "Evento", href: "#evento" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="#hero" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20FK-iHYLZuEcu30SEx3wGPleob3wNXNAPA.png"
            alt="Logo FK"
            width={80}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="#evento">Evento 10 Anos</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-8">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20FK-iHYLZuEcu30SEx3wGPleob3wNXNAPA.png"
                  alt="Logo FK"
                  width={80}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
                  <Link href="#evento">Evento 10 Anos</Link>
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
