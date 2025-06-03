"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
    }))
    setParticles(newParticles)

    // Mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 2,
        y: (clientY / innerHeight - 0.5) * 2,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("historia")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      ref={scrollRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden gradient-dark-premium"
    >
      {/* Animated Particles Background */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Parallax Background Elements */}
      <div className="absolute inset-0 parallax-container">
        <div
          className="parallax-element absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"
          style={{
            transform: `translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 0)`,
          }}
        />
        <div
          className="parallax-element absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,0,200,0.15),transparent_70%)]"
          style={{
            transform: `translate3d(${mousePosition.x * -15}px, ${mousePosition.y * -15}px, 0)`,
          }}
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        {/* Logo FK 10 Anos Completa */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 hover-lift"
          style={{
            transform: `translate3d(${mousePosition.x * 5}px, ${mousePosition.y * 5}px, 0)`,
          }}
        >
          <Image
            src="/images/fk-10-anos-completo.png"
            alt="FK 10 Anos"
            width={500}
            height={600}
            className="w-auto h-auto max-h-[350px] md:max-h-[450px] lg:max-h-[500px] drop-shadow-2xl"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-[800px] text-body-large text-white/90 mb-10 leading-relaxed"
          style={{
            transform: `translate3d(${mousePosition.x * 2}px, ${mousePosition.y * 2}px, 0)`,
          }}
        >
          Uma{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold">
            década
          </span>{" "}
          construindo{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
            conexões autênticas
          </span>{" "}
          e promovendo{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-bold">
            encontros memoráveis
          </span>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hover-lift"
        >
          <Button
            onClick={scrollToNextSection}
            size="lg"
            className="btn-primary-gradient text-white text-lg px-8 py-4 rounded-full font-semibold shadow-2xl"
          >
            Garanta seu Ingresso
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hover-lift"
        onClick={scrollToNextSection}
      >
        <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300">
          <span className="text-sm mb-2 font-medium">Explore nossa história</span>
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
