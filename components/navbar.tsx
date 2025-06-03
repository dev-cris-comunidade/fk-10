"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
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
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100

      setScrollProgress(progress)
      setIsScrolled(scrollTop > 50)

      // Update active section
      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? "glass backdrop-blur-xl py-2 shadow-2xl" : "bg-transparent py-4"
        }`}
      >
        <div className="container flex items-center justify-between">
          <Link
            href="#hero"
            className="flex items-center hover-lift"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("#hero")
            }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20FK-iHYLZuEcu30SEx3wGPleob3wNXNAPA.png"
              alt="Logo FK"
              width={80}
              height={40}
              className="h-10 w-auto transition-transform duration-300 hover:scale-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary relative ${
                  activeSection === item.href.substring(1)
                    ? "nav-link-active"
                    : "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              onClick={() => handleNavClick("#evento")}
              className="btn-primary-gradient text-white font-semibold px-6 py-2 rounded-full hover-lift"
            >
              Evento 10 Anos
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover-lift">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass backdrop-blur-xl border-l border-white/20">
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
                <nav className="flex flex-col space-y-6">
                  {navItems.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`text-lg font-medium py-3 text-left hover:text-primary transition-all duration-300 animate-delay-${index * 100} ${
                        activeSection === item.href.substring(1) ? "text-primary font-semibold" : ""
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                  <Button
                    onClick={() => handleNavClick("#evento")}
                    className="mt-6 btn-primary-gradient text-white font-semibold py-3 rounded-full hover-lift"
                  >
                    Evento 10 Anos
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  )
}
