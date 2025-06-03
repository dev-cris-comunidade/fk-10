"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Handshake, Shield, Scale, Users } from "lucide-react"

const pilares = [
  {
    title: "Liberdade",
    description:
      "A liberdade de escolher como viver e se relacionar, sem amarras morais, sociais ou normativas. Cada pessoa tem o direito de viver seus afetos com autenticidade e autonomia.",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-900/20",
  },
  {
    title: "Consenso",
    description:
      "Todas as interações partem do consentimento mútuo — com escuta, presença e cuidado. Nenhum desejo vale mais do que o bem-estar coletivo.",
    icon: Handshake,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    title: "Respeito",
    description:
      "Respeitamos os limites, identidades e escolhas de cada pessoa. Nenhum tipo de afeto deve ser imposto ou desvalorizado — cada vínculo é legítimo em sua forma e intensidade.",
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    title: "Igualdade",
    description:
      "Praticamos a igualdade como compromisso ativo, especialmente nos acordos. Não compactuamos com relações onde só um dos lados tem liberdade e o outro vive sob restrições. A liberdade precisa ser recíproca — ou não é liberdade.",
    icon: Scale,
    color: "text-amber-500",
    bgColor: "bg-amber-100 dark:bg-amber-900/20",
  },
  {
    title: "Diversidade",
    description:
      "Celebramos a pluralidade em todas as suas formas: de gênero, corpos, afetos, desejos, raças, histórias e vivências. Repudiamos qualquer forma de preconceito, discriminação ou exclusão. A FK é para todes.",
    icon: Users,
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
]

export default function PilaresSection() {
  return (
    <section
      id="pilares"
      className="py-20 md:py-32 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Os <span className="highlight-gradient">Pilares</span> da FK
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300"
          >
            <span className="highlight-primary">Cinco valores</span> que sustentam cada edição da FK e moldam a forma
            como vivemos comunidade há uma década:
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pilares.map((pilar, index) => (
            <motion.div
              key={pilar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="pillar-card"
            >
              <Card className="h-full gradient-border shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${pilar.bgColor} ${pilar.color}`}>
                      <pilar.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl" style={{ fontFamily: "var(--font-playfair)" }}>
                      {pilar.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    {pilar.description.split(" ").map((word, i) => {
                      // Destacar palavras-chave específicas
                      const keywords = [
                        "liberdade",
                        "autenticidade",
                        "autonomia",
                        "consentimento",
                        "escuta",
                        "presença",
                        "cuidado",
                        "respeito",
                        "limites",
                        "identidades",
                        "escolhas",
                        "igualdade",
                        "compromisso",
                        "diversidade",
                        "pluralidade",
                      ]

                      const lowerWord = word.toLowerCase().replace(/[.,;:!?]/g, "")

                      if (keywords.includes(lowerWord)) {
                        return (
                          <span key={i} className={`${pilar.color} font-medium`}>
                            {word}{" "}
                          </span>
                        )
                      }
                      return word + " "
                    })}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
