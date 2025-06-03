"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

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
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,0,200,0.15),transparent_70%)]"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 animate-float"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FK%20Logo%20Especial%2010%20anos-yfZA6G3gFsAunXdiPiVCwaO2H18LW7.png"
            alt="FK 10 Anos"
            width={300}
            height={200}
            className="w-auto h-auto max-h-[200px] md:max-h-[300px]"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-playfair text-glow mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-fuchsia-500 to-purple-500"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          FK 10 Anos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-[700px] text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8"
        >
          Uma <span className="highlight-primary">década</span> construindo{" "}
          <span className="highlight-gradient">conexões autênticas</span> e promovendo{" "}
          <span className="highlight-underline">encontros memoráveis</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg">
            <a href="#evento">Garanta seu Ingresso</a>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNextSection}
      >
        <ChevronDown className="h-10 w-10 text-primary animate-bounce" />
      </motion.div>
    </section>
  )
}
