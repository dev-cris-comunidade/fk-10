"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Music, Sofa, ImageIcon, Star, Gift, Heart } from "lucide-react"

const eventDetails = [
  {
    icon: Music,
    title: "DJs incríveis",
    description: "Seleção musical que vai te fazer dançar a noite toda",
  },
  {
    icon: Sofa,
    title: "Lounge dos veteranos",
    description: "Espaço especial para quem acompanha a FK desde o início",
  },
  {
    icon: ImageIcon,
    title: "Galeria de fotos inéditas",
    description: "Uma viagem visual pelos 10 anos de história da FK",
  },
  {
    icon: Star,
    title: "Performances especiais",
    description: "Apresentações exclusivas para celebrar esta data",
  },
  {
    icon: Gift,
    title: "Surpresas e brindes",
    description: "Lembranças especiais para os participantes",
  },
  {
    icon: Heart,
    title: "Muito afeto e beijos livres",
    description: "A essência da FK em sua forma mais pura",
  },
]

export default function EventoSection() {
  return (
    <section id="evento" className="py-20 md:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="font-playfair text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Celebração de <span className="highlight-gradient">10 Anos!</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            Uma noite <span className="highlight-primary">inesquecível</span> para celebrar uma década de{" "}
            <span className="highlight-underline">conexões autênticas</span> e{" "}
            <span className="highlight-box">liberdade</span>.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="gradient-border shadow-lg mb-12">
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
                      12 de Julho de 2025
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">Horário e local a confirmar</p>
                  </div>
                </div>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg">
                  Garanta seu Ingresso
                </Button>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-2xl font-semibold text-center mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
            O que <span className="highlight-gradient">esperar</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventDetails.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
